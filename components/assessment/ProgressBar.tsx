interface ProgressBarProps {
  progress: number; // 0–100
  label?: string;   // e.g. "Care needs", "About your loved one"
}

export default function ProgressBar({ progress, label }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium text-slate-400 tracking-wide uppercase">
          {label ?? "Assessment"}
        </span>
        <span className="text-xs font-semibold text-slate-500">
          {clamped}% complete
        </span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
