import Logo from "../../../../public/assets/icons/Final Logo 1.svg";
import FolderCode from "../../../../public/assets/icons/lucide/folder-code.svg";
import UserImage from "../../../../public/assets/icons/Avatar.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import Image from "next/image";
import SidebarItem from "./sidebar-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function DashboardSidebar() {
  const session = await getServerSession(authOptions);
  return (
    <Sidebar className="bg-blue-50 pt-3 mb-11 w-1/5">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex flex-col items-start  mb-16">
            <Image src={Logo} alt="logo" className="w-36 h-36 mb-2" />
            <div className="flex items-center justify-center ">
              <Image src={FolderCode} alt="Logo" className="w-8 h-8 " />
              <h1 className="text-base font-semibold text-blue-600">
                Exam App
              </h1>
            </div>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="ps-2">
              <SidebarItem />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className=" p-4">
        <div className="flex gap-2 ">
          <Image src={UserImage} alt="user-img" className="w-11 h-11" />
          <div className="w-full">
            <p className="text-blue-600 ">{session?.user.firstName}</p>
            <p className="text-sm text-gray-500   break-words ">
              {session?.user.email}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
