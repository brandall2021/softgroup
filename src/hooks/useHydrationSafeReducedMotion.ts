"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function useHydrationSafeReducedMotion() {
  const reducedMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated ? !!reducedMotion : false;
}
