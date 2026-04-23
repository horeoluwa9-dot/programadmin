import logo from "@/assets/abc-logo.png";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textClassName?: string;
}

export function BrandLogo({ className, size = 40, showText = false, textClassName }: BrandLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <img
        src={logo}
        alt="ABC — African Business College"
        width={size}
        height={size}
        className="object-contain shrink-0"
        style={{ height: size, width: size }}
      />
      {showText && (
        <div className={cn("min-w-0 leading-tight", textClassName)}>
          <div className="truncate text-sm font-bold text-sidebar-foreground">ABC Admin</div>
          <div className="truncate text-[11px] text-sidebar-foreground/60">African Business College</div>
        </div>
      )}
    </div>
  );
}
