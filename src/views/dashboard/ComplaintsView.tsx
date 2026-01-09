import DefaultPageTitle from "@/components/shared/DefaultPageTitle";
import ComplaintsTable from "@/components/table/ComplaintsTable";
import { complaintsData } from "@/assets/dataset/ComplaintDataset";

export default function ComplaintsView() {
  return (
    <section>
      <DefaultPageTitle title="Complaints Management" className="mb-6 mt-4"/>
      <ComplaintsTable data={complaintsData} />
    </section>
  )
}