import DiagonalArrowIcon from "@/assets/icon/diagonal-arrow-icon.svg";

interface SectionHeaderProps {
  title: string;
  actionLink?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export default function SectionHeader({
  title,
  actionLink,
  className,
}: SectionHeaderProps) {
  const ActionComponent = actionLink?.href ? "a" : actionLink?.onClick ? "button" : null;

  return (
    <div className={`flex items-center justify-between mb-4 ${className || ""}`}>
      <div className="flex items-center gap-2">
        <div className="w-1 h-6 bg-[#FBC02D] rounded"></div>
        <h3 className="text-lg font-semibold text-white light:text-[#171717]">{title}</h3>
      </div>
      {actionLink && ActionComponent && (
        <ActionComponent
          href={actionLink.href}
          onClick={actionLink.onClick}
          className="text-sm text-[#FBC02D] hover:underline flex items-center gap-1 font-light"
        >
          {actionLink.label}
          <DiagonalArrowIcon className="w-4 h-4" />
        </ActionComponent>
      )}
    </div>
  );
}
