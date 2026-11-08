import { cn } from "../lib/utils";

const variants = {
  default:
    "bg-[#e2b79d] text-[#0f0e13] hover:bg-[#ecc9b3] shadow-lg shadow-black/20",
  outline:
    "border border-white/20 text-[#f4f1ec] hover:bg-white/5 hover:border-white/30",
};

export function Button({ variant = "default", className, children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
