import { ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FormDialogProps {
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (b: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  submitLabel?: string;
  onSubmit?: () => void;
  onCancel?: () => void;
  size?: "sm" | "md" | "lg";
  submitting?: boolean;
}

export function FormDialog({
  trigger,
  open,
  onOpenChange,
  title,
  description,
  children,
  submitLabel = "Save",
  onSubmit,
  onCancel,
  size = "md",
  submitting,
}: FormDialogProps) {
  const widths = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-3xl" };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={widths[size]}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.();
          }}
          className="space-y-4"
        >
          <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">{children}</div>
          <DialogFooter className="pt-2 border-t border-border">
            <Button type="button" variant="outline" onClick={() => { onCancel?.(); onOpenChange?.(false); }}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting} className="bg-gradient-primary text-primary-foreground">
              {submitting ? "Saving…" : submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function FormField({ label, hint, children, required }: { label: string; hint?: string; children: ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-foreground">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {hint && <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>}
    </label>
  );
}
