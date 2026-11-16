/** @vitest-environment jsdom */

import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { BrandLogo } from "../src/components/ui/BrandLogo";
import Footer from "../src/components/Footer";
import Navbar from "../src/components/Navbar";

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

describe("BrandLogo", () => {
  it("renders the navbar logo with larger premium sizing classes", () => {
    render(React.createElement(BrandLogo, { context: "navbar" }));

    const img = screen.getByAltText("SoftGroup");
    expect(img.getAttribute("src")).toBe("/logo-nav.png");
    expect(img.className).toContain("h-10");
  });

  it("renders the footer logo with a larger footprint than the navbar baseline", () => {
    render(React.createElement(BrandLogo, { context: "footer" }));

    expect(screen.getByAltText("SoftGroup").className).toMatch(/h-11|h-12/);
  });

  it("renders BrandLogo in Navbar without removing the mobile menu button", () => {
    render(React.createElement(Navbar));

    expect(screen.getByAltText("SoftGroup")).toBeTruthy();
    expect(screen.getByLabelText(/abrir menú/i)).toBeTruthy();
  });

  it("renders premium social badges in Footer", () => {
    render(React.createElement(Footer));

    expect(screen.getAllByTestId("premium-icon-badge").length).toBeGreaterThan(0);
  });
});
