export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
      <div
        className="h-full rounded-full bg-slate-900 transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
      />
    </div>
  );
}
