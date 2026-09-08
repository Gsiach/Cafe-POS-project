import { describe, it, expect } from "vitest"

function calculateTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

describe("calculateTotal", () => {
  it("returns 0 for an empty cart", () => {
    expect(calculateTotal([])).toBe(0)
  })

  it("returns correct sum for a single item", () => {
    const cart = [{ price: 25, quantity: 2 }]
    expect(calculateTotal(cart)).toBe(50)
  })

  it("returns correct sum for multiple different items", () => {
    const cart = [
      { price: 25, quantity: 1 }, // Latte
      { price: 35, quantity: 1 }  // Sandwich
    ]
    expect(calculateTotal(cart)).toBe(60)
  })
})
