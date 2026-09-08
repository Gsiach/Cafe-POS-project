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
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

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

  function toggleTheme() {
    setTheme(prev => (prev === "dark" ? "light" : "dark"))
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setSession(null)
    setUserRole(null)
  }

  const topBar = (
    <div style={{ position: "fixed", top: "16px", right: "16px", zIndex: 100, display: "flex", gap: "10px" }}>
      <button onClick={toggleTheme} style={{ padding: "8px 14px" }}>
        {theme === "dark" ? "☀ Light" : "🌙 Dark"}
      </button>
      {session && (
        <button onClick={handleLogout} style={{ padding: "8px 14px" }}>
          Logout
        </button>
      )}
    </div>
  )

  if (!session) return <>{topBar}<Login /></>

  let screen
  switch (userRole) {
    case "Cashier":
    case "Waiter":
      screen = <OrderEntry session={session} role={userRole} />
      break
    case "KitchenStaff":
      screen = <KitchenDisplay session={session} />
      break
    case "Manager":
    case "Administrator":
      screen = <ManagerDashboard session={session} />
      break
    default:
      screen = <div style={{ padding: "20px" }}>Loading...</div>
  }

  return <>{topBar}{screen}</>
}
