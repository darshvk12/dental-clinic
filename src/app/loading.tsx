export default function Loading() {
  return (
    <div className="pt-[72px] min-h-screen flex items-center justify-center bg-dental-cream">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-3 border-dental-navy-200 border-t-dental-navy-700 animate-spin" />
        <div className="font-display text-dental-slate-400 text-lg">Loading…</div>
      </div>
    </div>
  );
}
