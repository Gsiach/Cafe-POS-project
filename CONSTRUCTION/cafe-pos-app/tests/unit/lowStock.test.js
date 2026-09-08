import { describe, it, expect } from "vitest"

function isLowStock(currentQuantity, minimumThreshold) {
  return currentQuantity < minimumThreshold
}

describe("isLowStock", () => {
  it("returns true when quantity is below threshold", () => {
    expect(isLowStock(5, 10)).toBe(true)
  })

  it("returns false when quantity is above threshold", () => {
    expect(isLowStock(15, 10)).toBe(false)
  })

  it("returns false when quantity equals threshold", () => {
    expect(isLowStock(10, 10)).toBe(false)
  })
})
