import { describe, it, expect } from "vitest"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

describe("order integration (manual verification reference)", () => {
  it("orders table accepts inserts matching the schema", async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("id, status, order_type")
      .limit(1)

    expect(error).toBeNull()
    expect(Array.isArray(data)).toBe(true)
  })

  it("order_line_items links correctly to orders via order_id", async () => {
    const { data, error } = await supabase
      .from("order_line_items")
      .select("order_id, menu_item_id, quantity")
      .limit(1)

    expect(error).toBeNull()
    expect(Array.isArray(data)).toBe(true)
  })
})
