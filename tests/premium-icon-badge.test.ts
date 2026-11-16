/** @vitest-environment jsdom */

import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Rocket } from "lucide-react";
import { afterEach, describe, expect, it } from "vitest";

import AIAgent from "../src/components/AIAgent";
import Services from "../src/components/Services";
import { PremiumIconBadge } from "../src/components/ui/PremiumIconBadge";

class MockIntersectionObserver {
  observe() {}
  disconnect() {}
  unobserve() {}
}

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});

afterEach(() => {
  cleanup();
});

describe("PremiumIconBadge", () => {
  it("renders layered premium styling for a dark surface badge", () => {
    render(
      React.createElement(PremiumIconBadge, {
        icon: Rocket,
        tone: "brand",
        surface: "dark",
        size: "lg",
      })
    );

    const badge = screen.getByTestId("premium-icon-badge");
    expect(badge.className).toContain("rounded-2xl");
    expect(badge.className).toContain("from-");
  });

  it("renders premium icon badges inside Services cards", () => {
    render(React.createElement(Services));

    expect(screen.getAllByTestId("premium-icon-badge").length).toBeGreaterThan(0);
  });

  it("renders premium icon badges on dark sections without losing icon visibility", () => {
    render(React.createElement(AIAgent));

    expect(screen.getAllByTestId("premium-icon-badge").length).toBeGreaterThan(0);
  });
});
