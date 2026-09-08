import { useState, useEffect } from "react"
import { supabase } from "../lib/supabaseClient"

export default function ManagerDashboard({ session }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()

    const channel = supabase
      .channel("manager-orders")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => fetchOrders()
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  async function fetchOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*, cafe_tables(table_number), payments(amount, method)")
      .order("created_at", { ascending: false })

    if (error) console.error("Orders fetch error:", error)
    else setOrders(data)
    setLoading(false)
  }

  const totalRevenue = orders.reduce((sum, o) => {
    const paid = o.payments?.reduce((s, p) => s + Number(p.amount), 0) || 0
    return sum + paid
  }, 0)

  const statusCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1
    return acc
  }, {})

  if (loading) return <div style={{ padding: "20px" }}>Loading dashboard...</div>

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manager Dashboard</h2>

      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        <div className="panel" style={{ minWidth: "160px" }}>
          <h3>Total Orders</h3>
          <p style={{ fontSize: "24px" }}>{orders.length}</p>
        </div>
        <div className="panel" style={{ minWidth: "160px" }}>
          <h3>Total Revenue</h3>
          <p style={{ fontSize: "24px" }}>K{totalRevenue.toFixed(2)}</p>
        </div>
        <div className="panel" style={{ minWidth: "160px" }}>
          <h3>By Status</h3>
          {Object.entries(statusCounts).map(([status, count]) => (
            <p key={status} style={{ margin: "4px 0" }}>{status}: {count}</p>
          ))}
        </div>
      </div>

      <div className="panel">
        <h3>All Orders</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "8px" }}>Order ID</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Type</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Table</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Status</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Amount</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Payment</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} style={{ borderTop: "1px solid var(--border)" }}>
                <td style={{ padding: "8px" }}>{o.id.slice(0, 8)}</td>
                <td style={{ padding: "8px" }}>{o.order_type}</td>
                <td style={{ padding: "8px" }}>{o.cafe_tables ? "Table " + o.cafe_tables.table_number : "-"}</td>
                <td style={{ padding: "8px" }}>{o.status}</td>
                <td style={{ padding: "8px" }}>
                  K{(o.payments?.reduce((s, p) => s + Number(p.amount), 0) || 0).toFixed(2)}
                </td>
                <td style={{ padding: "8px" }}>{o.payments?.[0]?.method || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p>No orders yet.</p>}
      </div>
    </div>
  )
}
