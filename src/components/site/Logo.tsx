import Link from "next/link";
import { Leaf } from "lucide-react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Leaf className="h-6 w-6" />
      </div>
      <div className="leading-tight">
        <div className={`font-extrabold tracking-wide text-lg ${light ? "text-white" : "text-primary-dark"}`}>
          NO.1 LAWNS
        </div>
        <div className={`text-[10px] tracking-[0.18em] ${light ? "text-white/80" : "text-muted-foreground"}`}>
          GARDEN MAINTENANCE
        </div>
      </div>
    </Link>
  );
}
