/** @vitest-environment jsdom */

import React from "react";
import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("framer-motion", () => ({
  useReducedMotion: () => true,
}));

import { useHydrationSafeReducedMotion } from "../src/hooks/useHydrationSafeReducedMotion";

function Probe() {
  const prefersReduced = useHydrationSafeReducedMotion();
  return React.createElement("span", null, prefersReduced ? "reduce" : "normal");
}

describe("useHydrationSafeReducedMotion", () => {
  it("starts as false on the first client render and adopts the media query after mount", async () => {
    const ssrHtml = renderToString(React.createElement(Probe));
    expect(ssrHtml).toContain("normal");

    render(React.createElement(Probe));
    await screen.findByText("reduce");
  });
});
