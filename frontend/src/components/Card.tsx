interface CardProps {
  title: string;
  subtitle: string;
  value?: string;
  icon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, subtitle, value, icon }) => (
  <div className="bg-light p-5 rounded-xl shadow-sm border border-light hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-light rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
        {icon || "📦"}
      </div>
      {value && <span className="text-lg font-bold text-success">{value}</span>}
    </div>
    <h3 className="text-gray-800 font-bold text-lg">{title}</h3>
    <p className="text-gray-500 text-sm font-medium">{subtitle}</p>
  </div>
);