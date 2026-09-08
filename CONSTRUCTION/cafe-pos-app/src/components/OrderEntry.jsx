import { useState, useEffect } from "react"
import { supabase } from "../lib/supabaseClient"

export default function OrderEntry({ session, role }) {
  const [menuItems, setMenuItems] = useState([])
  const [tables, setTables] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const [orderType, setOrderType] = useState("Counter")
  const [tableId, setTableId] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("Cash")
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchMenu()
    fetchTables()
  }, [])

  async function fetchMenu() {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*, menu_item_categories(name)")
      .eq("availability", true)
    if (error) console.error("Menu fetch error:", error)
    else setMenuItems(data)
    setLoading(false)
  }

  async function fetchTables() {
    const { data, error } = await supabase
      .from("cafe_tables")
      .select("*")
      .order("table_number")
    if (error) console.error("Tables fetch error:", error)
    else setTables(data)
  }

  function addToCart(item) {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id)
      if (existing) {
        return prev.map(c =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }]
    })
  }

  function removeFromCart(itemId) {
    setCart(prev => prev.filter(c => c.id !== itemId))
  }

  const total = cart.reduce((sum, c) => sum + c.price * c.quantity, 0)

  async function confirmOrder() {
    if (cart.length === 0) {
      setMessage("Cart is empty.")
      return
    }
    if (orderType === "Dine-in" && !tableId) {
      setMessage("Select a table for dine-in orders.")
      return
    }

    setSubmitting(true)
    setMessage("")

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_type: orderType,
        table_id: orderType === "Dine-in" ? tableId : null,
        taken_by: session.user.id
      })
      .select()
      .single()

    if (orderError) {
      console.error("Order insert error:", orderError)
      setMessage("Failed to create order: " + orderError.message)
      setSubmitting(false)
      return
    }

    const lineItems = cart.map(c => ({
      order_id: order.id,
      menu_item_id: c.id,
      quantity: c.quantity,
      unit_price: c.price
    }))

    const { error: lineError } = await supabase
      .from("order_line_items")
      .insert(lineItems)

    if (lineError) {
      console.error("Line items insert error:", lineError)
      setMessage("Order created but items failed: " + lineError.message)
      setSubmitting(false)
      return
    }

    const { error: paymentError } = await supabase
      .from("payments")
      .insert({
        order_id: order.id,
        amount: total,
        method: paymentMethod
      })

    if (paymentError) {
      console.error("Payment insert error:", paymentError)
      setMessage("Order created but payment failed: " + paymentError.message)
      setSubmitting(false)
      return
    }

    setMessage("Order #" + order.id.slice(0, 8) + " placed successfully!")
    setCart([])
    setTableId("")
    setSubmitting(false)
  }

  if (loading) return <div style={{ padding: "20px" }}>Loading menu...</div>

  return (
    <div style={{ padding: "20px", display: "flex", gap: "24px" }}>
      <div className="panel">
        <h2>Order Entry — {role}</h2>
        <h3>Menu</h3>
        {menuItems.map(item => (
          <div key={item.id} style={{ marginBottom: "8px" }}>
            <button onClick={() => addToCart(item)} style={{ padding: "8px 14px" }}>
              + {item.name} — K{item.price} ({item.menu_item_categories?.name})
            </button>
          </div>
        ))}
      </div>

      <div className="panel" style={{ minWidth: "300px" }}>
        <h3>Cart</h3>
        {cart.length === 0 && <p>No items yet.</p>}
        {cart.map(c => (
          <div key={c.id} style={{ marginBottom: "6px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span>{c.name} x{c.quantity} — K{(c.price * c.quantity).toFixed(2)}</span>
            <button onClick={() => removeFromCart(c.id)} style={{ padding: "4px 10px" }}>
              Remove
            </button>
          </div>
        ))}
        <h3>Total: K{total.toFixed(2)}</h3>

        <div style={{ marginTop: "20px" }}>
          <label>
            <input
              type="radio"
              checked={orderType === "Counter"}
              onChange={() => setOrderType("Counter")}
            /> Counter
          </label>
          <label style={{ marginLeft: "20px" }}>
            <input
              type="radio"
              checked={orderType === "Dine-in"}
              onChange={() => setOrderType("Dine-in")}
            /> Dine-in
          </label>
        </div>

        {orderType === "Dine-in" && (
          <div style={{ marginTop: "10px" }}>
            <select value={tableId} onChange={e => setTableId(e.target.value)}>
              <option value="">Select table</option>
              {tables.map(t => (
                <option key={t.id} value={t.id}>Table {t.table_number}</option>
              ))}
            </select>
          </div>
        )}

        <div style={{ marginTop: "10px" }}>
          <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="MobileMoney">MobileMoney</option>
          </select>
        </div>

        <button
          onClick={confirmOrder}
          disabled={submitting}
          style={{ marginTop: "15px", padding: "10px 20px" }}
        >
          {submitting ? "Placing order..." : "Confirm Order"}
        </button>

        {message && <p style={{ marginTop: "10px" }}>{message}</p>}
      </div>
    </div>
  )
}
