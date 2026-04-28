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
  iconColor,
}: InfoCardProps) => {
  return (
    <div
      className={`rounded-lg border-t-4 bg-zinc-900 p-6 ${borderColor} flex gap-4`}
    >
      <Icon className={`${iconColor} flex-shrink-0`} size={32} />
      <div>
        <h3 className="mb-2 font-display text-xl text-white">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
};
