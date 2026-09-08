import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    setError("")
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError("Invalid email or password.")
    setLoading(false)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", gap: "12px" }}>
      <h2>Cafe Restaurant POS System</h2>
      <h3>Staff Login</h3>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ padding: "8px", width: "280px", fontSize: "16px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ padding: "8px", width: "280px", fontSize: "16px" }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        onClick={handleLogin}
        disabled={loading}
        style={{ padding: "10px 40px", fontSize: "16px", cursor: "pointer" }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  )
}
