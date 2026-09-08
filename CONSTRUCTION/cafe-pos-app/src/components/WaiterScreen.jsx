import { useState } from "react"
import OrderEntry from "./OrderEntry"
import ActiveOrders from "./ActiveOrders"

export default function WaiterScreen({ session, role }) {
  const [tab, setTab] = useState("order")

  return (
    <div>
      <div style={{ padding: "20px 20px 0" }}>
        <button
          onClick={() => setTab("order")}
          style={{ padding: "8px 16px", marginRight: "10px", fontWeight: tab === "order" ? "bold" : "normal" }}
        >
          Take Order
        </button>
        <button
          onClick={() => setTab("serve")}
          style={{ padding: "8px 16px", fontWeight: tab === "serve" ? "bold" : "normal" }}
        >
          Serve Orders
        </button>
      </div>

      {tab === "order" && <OrderEntry session={session} role={role} />}
      {tab === "serve" && <ActiveOrders session={session} />}
    </div>
  )
}
