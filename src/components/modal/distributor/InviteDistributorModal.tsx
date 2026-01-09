import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import BaseModal from "../BaseModal";
import SectionHeader from "@/components/shared/SectionHeader";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

interface InviteDistributorModalProps {
  isOpen: boolean;
  onClose: () => void;
  disableCloseOnInteractOutside?: boolean;
  showCloseButton?: boolean;
  onButtonClick?: () => void;
  className?: string;
}

export default function InviteDistributorModal({
  isOpen,
  onClose,
  disableCloseOnInteractOutside = false,
  showCloseButton = true,
  className = '',
//   onButtonClick = () => {},
}: InviteDistributorModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      description=""
      maxWidth="lg"
      disableCloseOnInteractOutside={disableCloseOnInteractOutside}
      showCloseButton={showCloseButton}
      className={`w-full max-w-xs md:max-w-sm lg:min-w-[640px] lg:max-w-xl! ${className}`}
    >
    <div className="flex flex-col gap-2 pb-4 -mt-4">
        <DialogTitle className="text-left">
            <SectionHeader title="View Distributor"
            className={` font-medium text-xl! `}
             />
        </DialogTitle>
        <VisuallyHidden>
            <DialogDescription>
            View the distributor details
            </DialogDescription>
        </VisuallyHidden>
    </div>
    <div className="flex flex-col gap-y-4 max-h-[500px] overflow-y-auto no-scrollbar">
        <div className="flex flex-col pb-8 border-b border-[#FFFFFFCC]">
            <p className="text-white text-base font-medium py-6">Distributor Info:</p>
            <div className="flex flex-col gap-y-6 ml-4">
            <DistributorInfo label="Distributor:" value="StarLink Oil" />
            <DistributorInfo label="Tier:" value="Gold" />
            <DistributorInfo label="Status:" value="Active" valueClassName="text-green-500" />
            <DistributorInfo label="Region:" value="East" />
            <DistributorInfo label="Joined:" value="23 Nov 2025" />
            <DistributorInfo label="Location:" value="Lagos, Nigeria" />
            <DistributorInfo label="Contact Person:" value="Chukwudi Onwuka" />
            <DistributorInfo label="Email Address:" value="chukwudi.onwuka@example.com" />
            <DistributorInfo label="Phone Number:" value="+234 812 345 6789" />
            </div>
        </div>
        <div className="flex flex-col pb-8 border-b border-[#FFFFFFCC]">
            <p className="text-white text-base font-medium py-6">Overview Tab:</p>
            <div className="flex flex-col gap-y-6 ml-4">
            <DistributorInfo label="Total Orders:" value="20" />
            <DistributorInfo label="Total Revenue:" value="₦1,040,000" />
            <DistributorInfo label="Tier Progress:" value="85% to next level" />
            </div>
        </div>
        <div className="flex flex-col pb-8 border-b border-[#FFFFFFCC]">
            <p className="text-white text-base font-medium py-6">Order Timeline:</p>
            <div className="flex flex-col gap-y-6 ml-4">
            <DistributorInfo label="Total Orders:" value="20" />
            <DistributorInfo label="Total Revenue:" value="₦1,040,000" />
            <DistributorInfo label="Tier Progress:" value="85% to next level" />
            </div>
        </div>
    </div>
    </BaseModal>
  );
}


const DistributorInfo = ({ label, value, className, labelClassName, valueClassName }: { label: string, value: string, className?: string, labelClassName?: string, valueClassName?: string }) => {
  return (
    <div className={`flex items-bottom justify-between ${className}`}>
      <p className={`text-[#FAFAFA] text-sm font-light leading-[100%] ${labelClassName}`}>{label}</p>
      <p className={`text-[#FAFAFA] text-sm font-light leading-[100%] ${valueClassName}`}>{value}</p>
    </div>
  );
};