import DefaultPageTitle from "@/components/shared/DefaultPageTitle";
import { DefaultButton } from "@/components/input/DefaultButton";
import { DefaultInput } from "@/components/input/DefaultInput";
import { DefaultDropdown } from "@/components/input/DefaultDropdown";

export default function InviteDistributorView() {
  return (
    <section>
        <DefaultPageTitle title="Invite Distributor" titleClassName="text-xl!" goBack className="my-4!" />
        <div className="bg-transparent light:bg-white rounded-[18px] md:rounded-[24px] lg:rounded-[32px] border border-[#616161B2] p-6 shadow-sm mb-6">
            <h3 className="text-sm font-light text-[#FFFFFF] light:text-[#171717]">
            Distributor Details:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 lg:mt-12 pb-6 lg:pb-12">
                <div className="md:col-span-2! col-span-1!">
                <DefaultInput label="Distributor Name:" className="bg-transparent light:bg-white" />
                </div>
                <DefaultInput label="Contact Person:" className="bg-transparent light:bg-white col-span-1!" />
                <DefaultInput label="Email Address:" className="bg-transparent light:bg-white col-span-1!" />
                <DefaultInput label="Phone Number:" className="bg-transparent light:bg-white col-span-1!" />
                <DefaultDropdown label="Tier:" options={[
                    { label: 'Bronze', value: 'Bronze' },
                    { label: 'Silver', value: 'Silver' },
                    { label: 'Gold', value: 'Gold' },
                    { label: 'Platinum', value: 'Platinum' },
                ]} placeholder="Select Tier" className="bg-transparent! light:bg-white col-span-1!" />
                <DefaultInput label="Location:" className="bg-transparent light:bg-white col-span-1!" />
                <DefaultInput label="Message:" className="bg-transparent light:bg-white col-span-1!" />
                <div className="md:col-span-2! col-span-1! flex justify-end mt-6">
                    <DefaultButton
                        label="Send Invite"
                        className="tap-effect inline-flex items-center justify-center gap-2 bg-[#FBC02D] text-black! px-4 py-2 rounded-full"
                        onClick={() => {}}
                    />
                </div>
            </div>
        </div>
    </section>
  );
}
