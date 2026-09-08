import { useState, useEffect } from "react"
import { supabase } from "../lib/supabaseClient"

export default function KitchenDisplay({ session }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()

    const channel = supabase
      .channel("kitchen-orders")
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
      .select("*, cafe_tables(table_number), order_line_items(quantity, menu_items(name))")
      .in("status", ["Placed", "Preparing"])
      .order("created_at", { ascending: true })

    if (error) console.error("Kitchen orders fetch error:", error)
    else setOrders(data)
    setLoading(false)
  }

  async function updateStatus(orderId, newStatus) {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId)

    if (error) console.error("Status update error:", error)
  }

  if (loading) return <div style={{ padding: "20px" }}>Loading orders...</div>

  return (
    <div style={{ padding: "20px" }}>
      <h2>Kitchen Display</h2>
      {orders.length === 0 && <p>No active orders.</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {orders.map(o => (
          <div key={o.id} className="panel" style={{ minWidth: "260px" }}>
            <h3>
              {o.order_type === "Dine-in" ? "Table " + o.cafe_tables?.table_number : "Counter"}
            </h3>
            <p style={{ fontWeight: "bold" }}>Status: {o.status}</p>
            <ul>
              {o.order_line_items.map((li, i) => (
                <li key={i}>{li.quantity}x {li.menu_items?.name}</li>
              ))}
            </ul>
            {o.status === "Placed" && (
              <button onClick={() => updateStatus(o.id, "Preparing")} style={{ padding: "8px 14px" }}>
                Mark Preparing
              </button>
            )}
            {o.status === "Preparing" && (
              <button onClick={() => updateStatus(o.id, "Ready")} style={{ padding: "8px 14px" }}>
                Mark Ready
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
