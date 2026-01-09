import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Bell } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { BadgeCheck, LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";
import { StringUtil } from "@/utils/StringUtil";
import ProfileImage from "@/assets/image/employee-image.png";

export const DefaultHeader = () => {
  // TODO: Replace with actual user data from auth/store
  const user = {
    name: "Emily Franklin",
    email: "emily@energyiq.com",
    profile_photo: ProfileImage,
  };

  const initials = StringUtil.abbreviateToTwoCharacter(user.name);

  const routeTitles: Record<string, string> = {
    "/dashboard/overview": "Dashboard Overview",
    "/dashboard/distributors": "Distributors",
    "/dashboard/inventory": "Inventory",
    "/dashboard/orders": "Orders",
    "/dashboard/financials": "Financials",
    "/dashboard/complaints": "Complaints",
    "/dashboard/analytics": "Analytics",
    "/dashboard/documents": "Documents",
    "/dashboard/employees": "Employees",
    "/dashboard/settings": "Settings",
  };

  const location = useLocation();
  const pathname = location.pathname;
  const currentRouteTitle = routeTitles[pathname] || "Dashboard Overview";

  const handleLogoutClick = async () => {
    // TODO: Implement logout logic
    console.log("Logout clicked");
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-1 pr-5">
            <div className="flex flex-col items-start gap-2">
              <h3 className="text-[16px] leading-[100%] text-[#FFFFFF] light:text-[#171717] font-semibold tracking-[-0.02em]">{currentRouteTitle}</h3>
            </div>
        </div>

        <div className="flex flex-row items-center gap-1">
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className={"tap-effect size-9 rounded-md flex justify-center items-center border border-white light:border-[#E5E5E5] bg-none"}>
                <div className="flex flex-row items-center relative">
                    <div className="size-[7px] rounded-full bg-red-500 absolute -top-1 right-0" />
                  <Bell className={"w-3.5! h-[16.6px]! stroke-white light:stroke-black"} />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel className="p-2 text-xs text-gray-500">
                No new notifications
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button
  className="
    h-12 
    bg-[#6161611A]! 
    rounded-full 
    inline-flex 
    items-center 
    justify-center 
    px-4! py-1
  "
>
  {/* Wrapper */}
  <div className="flex items-center gap-2">
    {/* Avatar */}
    <Avatar className="h-[35px] w-[35px] rounded-full shrink-0">
      <AvatarImage src={user.profile_photo || undefined} alt={user.name} />
      <AvatarFallback className="rounded-full bg-[#FBC02D] text-[#121212]">
        {initials}
      </AvatarFallback>
    </Avatar>

    {/* User Info */}
    <div className="max-sm:hidden flex flex-col gap-1 justify-start items-start">
      <h3 className="font-normal text-sm leading-none text-[#FAFAFA] light:text-[#171717]">
        {user.name}
      </h3>
      <h3 className="font-normal text-xs leading-none text-[#616161B2] light:text-[#616161B2]">
        Executive
      </h3>
    </div>
  </div>
</Button>

            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={"bottom"}
              align="end"
              sideOffset={4}
              >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.profile_photo || undefined} alt={user.name} />
                    <AvatarFallback className="rounded-lg bg-[#FBC02D] text-[#121212]">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogoutClick}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </section>
  );
};

{/* <div className="col-span-1 rounded-lg hidden items-center justify-center border-[0.5px] border-white light:border-[#E5E5E5] light:border-0 py-2">
  <svg className="stroke-white fill-white light:stroke-black light:fill-none size-2.5" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
</div> */}