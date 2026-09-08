import { useState, useEffect } from "react"
import { supabase } from "./lib/supabaseClient"
import Login from "./components/Login"
import OrderEntry from "./components/OrderEntry"
import KitchenDisplay from "./components/KitchenDisplay"
import ActiveOrders from "./components/ActiveOrders"
import ManagerDashboard from "./components/ManagerDashboard"

export default function App() {
  const [session, setSession] = useState(null)
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) fetchRole(session.user.id)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) fetchRole(session.user.id)
      else setUserRole(null)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchRole(userId) {
    const { data } = await supabase
      .from("users")
      .select("role_id, roles(role_name)")
      .eq("id", userId)
      .single()
    if (data) setUserRole(data.roles.role_name)
  }

  if (!session) return <Login />

  switch (userRole) {
    case "Cashier":
    case "Waiter":
      return <OrderEntry session={session} role={userRole} />
    case "KitchenStaff":
      return <KitchenDisplay session={session} />
    case "Manager":
    case "Administrator":
      return <ManagerDashboard session={session} />
    default:
      return <div>Loading...</div>
  }
}
