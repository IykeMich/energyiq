import SectionHeader from "./SectionHeader";
import AccountCard from "../card/AccountCard";

interface Account {
  label: string;
  value: string;
}

interface FinancialSnapshotProps {
  title?: string;
  actionLink?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  accounts: Account[];
  className?: string;
}

export default function FinancialSnapshot({
  title = "Financial Snapshot",
  actionLink,
  accounts,
  className,
}: FinancialSnapshotProps) {
  return (
    <div className={`bg-[#6161611A] light:bg-white rounded-2xl p-6 shadow-sm ${className || ""}`}>
      <SectionHeader title={title} actionLink={actionLink} />
      <div className="grid grid-cols-2 gap-4 mt-6 mb-4">
        {accounts.map((account, index) => (
          <AccountCard
            key={index}
            label={account.label}
            value={account.value}
          />
        ))}
      </div>
    </div>
  );
}
