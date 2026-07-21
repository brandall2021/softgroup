import { motion } from "framer-motion";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export { formatCurrency };

export default function AnimatedPrice({ value }: { value: number }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl"
    >
      {formatCurrency(value)}
    </motion.span>
  );
}
