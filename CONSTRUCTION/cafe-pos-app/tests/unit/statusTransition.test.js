import { describe, it, expect } from "vitest"

const VALID_TRANSITIONS = {
  Placed: ["Preparing"],
  Preparing: ["Ready"],
  Ready: ["Served"],
  Served: []
}

function isValidTransition(from, to) {
  return VALID_TRANSITIONS[from]?.includes(to) ?? false
}

describe("order status transitions", () => {
  it("allows Placed to Preparing", () => {
    expect(isValidTransition("Placed", "Preparing")).toBe(true)
  })

  it("allows Preparing to Ready", () => {
    expect(isValidTransition("Preparing", "Ready")).toBe(true)
  })

  it("allows Ready to Served", () => {
    expect(isValidTransition("Ready", "Served")).toBe(true)
  })

  it("rejects Placed jumping directly to Served", () => {
    expect(isValidTransition("Placed", "Served")).toBe(false)
  })

  it("rejects Served transitioning to anything", () => {
    expect(isValidTransition("Served", "Placed")).toBe(false)
  })
})
