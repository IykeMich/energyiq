import { VisuallyHidden } from "@/components/ui/visually-hidden";
import BaseModal from "../BaseModal";
import { DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import SectionHeader from "@/components/shared/SectionHeader";
import { DefaultInput } from "@/components/input/DefaultInput";
import { DefaultDropdown } from "@/components/input/DefaultDropdown";
import { DefaultButton } from "@/components/input/DefaultButton";

interface AddEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    disableCloseOnInteractOutside?: boolean;
    showCloseButton?: boolean;
    onButtonClick?: () => void;
    className?: string;
  }
export default function AddEmployeeModal({
    isOpen,
    onClose,
    disableCloseOnInteractOutside = false,
    showCloseButton = true,
    className = '',
}: AddEmployeeModalProps) {
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
      <div className="flex flex-col gap-0 pb-4 -mt-4">
        <DialogTitle className="text-left">
          <SectionHeader title="Add Employee"
            className={` font-medium text-xl! `}
          />
        </DialogTitle>
          <DialogDescription className="pl-2 text-left text-[#FAFAFA]">
            Send an invite to an employee to access the dashboard
          </DialogDescription>
      </div>
      <div className="flex flex-col gap-y-4 max-h-[500px] overflow-y-auto no-scrollbar">
        <DefaultInput label="Full Name" placeholder="Enter full name" className="bg-transparent light:bg-white" />
        <DefaultInput label="Email Address" placeholder="Enter email address" className="bg-transparent light:bg-white" />
        <DefaultInput label="Phone Number" placeholder="Enter phone number" className="bg-transparent light:bg-white" />
        <DefaultDropdown
         label="Role" options={[
          { label: 'Admin', value: 'admin' },
          { label: 'User', value: 'user' },
          { label: 'Manager', value: 'manager' },
          { label: 'Supervisor', value: 'supervisor' },
          { label: 'Employee', value: 'employee' },
          { label: 'Other', value: 'other' },
        ]} placeholder="Select role" className="bg-transparent! light:bg-white" />
        <DefaultDropdown
         label="Status" options={[
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
        ]} placeholder="Select status" className="bg-transparent! light:bg-white" />
      </div>
      <DialogFooter className="flex justify-end mt-3">
        <DefaultButton label="Send Invite" className="tap-effect bg-[#FBC02D] text-black font-medium leading-[100%] rounded-full!" />
      </DialogFooter>
    </BaseModal>
  )
}
