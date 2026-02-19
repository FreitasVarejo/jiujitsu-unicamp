import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  borderColor: string;
  iconColor: string;
}

export const InfoCard = ({ 
  icon: Icon, 
  title, 
  description, 
  borderColor, 
  iconColor 
}: InfoCardProps) => {
  return (
    <div className={`bg-zinc-900 p-6 rounded-lg border-t-4 ${borderColor}`}>
      <Icon className={iconColor} size={32} />
      <h3 className="text-xl font-display text-white mb-2 mt-4">
        {title}
      </h3>
      <p className="text-sm text-gray-400">
        {description}
      </p>
    </div>
  );
};
