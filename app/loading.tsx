export default function Loading() {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center gap-4">
        <div className="text-3xl font-bold tracking-tight">
          timetablr<span className="text-primary">.</span>
        </div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground/60">
          <span>Loading</span>
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "120ms" }} />
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "240ms" }} />
          </span>
        </div>
      </div>
    </div>
  );
}
