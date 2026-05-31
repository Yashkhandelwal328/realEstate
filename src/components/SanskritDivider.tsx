"use client";
export function SanskritDivider({ label = "ॐ" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-4 my-6 text-primary">
      <span className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
      <span className="font-display text-2xl">{label}</span>
      <span className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </div>
  );
}
