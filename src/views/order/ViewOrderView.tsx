import { DefaultButton } from "@/components/input/DefaultButton";
import DefaultPageTitle from "@/components/shared/DefaultPageTitle";
import LabelValueInfo from "@/components/shared/LabelValueInfo";

export default function ViewOrderView() {
  return (
    <section>
        <DefaultPageTitle title="Order Details" titleClassName="text-xl!" goBack className="my-4!" />

        <div className="flex gap-4">
            <div className="flex flex-col w-full lg:w-[60%] bg-[#6161611A] rounded-[18px] px-6 pb-12">
                <div className="flex flex-col w-full pb-8">
                    <p className="text-white text-base font-medium py-6">Info</p>
                    <div className="flex flex-col gap-y-6 ml-1">
                        <LabelValueInfo label="Order ID:" value="ORD-003" />
                        <LabelValueInfo label="Date of Purchase:" value="23 Nov 2025" />
                        <LabelValueInfo label="Payment Status:" value="Paid" valueClassName="text-green-500" />
                        <LabelValueInfo label="Amount:" value="₦1,040,000" />
                        <LabelValueInfo label="Payment Method:" value="Bank transfer or Atm card" />
                        <LabelValueInfo label="Delivery Status:" value="Delivered" valueClassName="text-green-500" />
                        <LabelValueInfo label="Estimated Delivery Date:" value="01-01-2026"/>
                    </div>
                </div>
                <div className="flex flex-col w-full pb-8">
                    <p className="text-white text-base font-medium py-6">Items</p>
                    <div className="flex flex-col gap-y-6 ml-1">
                        <LabelValueInfo label="Diesel (AGO) – 10,000 Litres" subLabel="Unit Price: ₦730" subLabelClassName="tracking-wide" value="10,000 Litres" />
                        <LabelValueInfo label="Fuel(PMS) – 1,500 Litres" subLabel="Unit Price: ₦1,000" subLabelClassName="tracking-wide" value="1,500 Litres" />
                        <LabelValueInfo label="Lubricant Oil (20L Kegs) – 10 Units" subLabel="Unit Price: ₦10,000" subLabelClassName="tracking-wide" value="10 Units" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-y-2 flex-1 bg-[#6161611A] rounded-[18px] px-6 pb-12">
                <div className="flex flex-col w-full pb-8">
                    <p className="text-white text-base font-medium py-6">Distributor Details:</p>
                    <div className="flex flex-col gap-y-6 ml-1">
                    <LabelValueInfo label="Name:" value="RM Oil Limited" />
                    <LabelValueInfo label="Email Address:" value="rmoil@gmail.com" />
                    <LabelValueInfo label="Phone Number:" value="+234 812 345 6789" />
                    <LabelValueInfo label="Order Note:" value="Please deliver the order to the nearest petrol station" />
                    </div>
                </div>
                <div className="flex flex-col w-full pb-8">
                    <p className="text-white text-base font-medium py-6">Shipping Information:</p>
                    <div className="flex flex-col gap-y-6 ml-1">
                    <LabelValueInfo label="Shipping Method:" value="Door step delivery" />
                    <LabelValueInfo label="Delivery Date:" value="01-01-2026" />
                    </div>
                </div>
                <div className="flex flex-col w-full pb-8 border-b border-[#FFFFFFCC] border-dashed">
                    <p className="text-white text-base font-medium py-6">Payment Details:</p>
                    <div className="flex flex-col gap-y-6 ml-1">
                    <LabelValueInfo label="Subtotal:" value="₦1,040,000" />
                    <LabelValueInfo label="Discount:" value="₦50,000" />
                    <LabelValueInfo label="Shipping Fee:" value="₦10,000" />
                    <LabelValueInfo label="Tax:" value="₦10,000" />
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full pb-8 mt-6">
                    {/* buttons */}
                    <div className="flex w-full gap-4">
                        <div className="flex w-1/2">
                        <DefaultButton label="Cancel Order" variant="outline" className="flex w-full tap-effect text-[#FBC02D] border-[#FBC02D] font-medium leading-[100%] rounded-full!" />
                        </div>
                        <div className="flex w-1/2">
                        <DefaultButton label="View Order" variant="outline" className="flex w-full tap-effect text-[#FBC02D] border-[#FBC02D] font-medium leading-[100%] rounded-full!" />
                        </div>
                    </div>
                        <DefaultButton label="View Order" className="flex w-full tap-effect bg-[#FBC02D] text-black font-medium leading-[100%] rounded-full!" />
                </div>
            </div>
        </div>
    </section>
  )
}
