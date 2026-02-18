interface KpiCardProps {
  label: string;
  value: string | number;
  icon: string;
  color: "blue" | "emerald" | "indigo";
}

export const KpiCard = ({ label, value, icon, color }: KpiCardProps) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    indigo: "bg-indigo-50 text-indigo-600"
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-500 text-sm font-bold uppercase tracking-tight">{label}</p>
        <p className="text-2xl font-black text-slate-900">{value}</p>
      </div>
    </div>
  );
};