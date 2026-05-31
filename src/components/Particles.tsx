export function Particles({ count = 24 }: { count?: number }) {
  const items = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((_, i) => {
        const size = 2 + Math.random() * 4;
        const left = Math.random() * 100;
        const delay = Math.random() * 12;
        const dur = 10 + Math.random() * 14;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-primary/60 blur-[1px]"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              bottom: `-10px`,
              animation: `particle-rise ${dur}s linear ${delay}s infinite`,
              boxShadow: "0 0 8px var(--gold)",
            }}
          />
        );
      })}
    </div>
  );
}
