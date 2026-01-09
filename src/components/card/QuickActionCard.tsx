export default function QuickActionCard({ icon, title, onClick }: { icon: React.ReactNode, title: string, onClick?: () => void }) {
  return (
    <div onClick={onClick} className="tap-effect bg-[#FFFFFF1A] light:bg-gray-100 rounded-lg py-4 px-4 gap-1 flex flex-col items-center justify-center">
      <p className="text-sm font-normal text-white light:text-[#616161] mb-1">{icon}</p>
      <p className="text-sm font-normal text-white light:text-[#616161] mb-1">{title}</p>
    </div>
  )
}
