"use client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SideBarOption } from "@/services/Constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className={"flex items-center"}>
        <Image
          src={"/logo.png"}
          alt="Logo"
          width={60}
          height={60}
          className="w-[70px]"
        />
        <Button className={"mt-4 w-full"}>
          <span className="text-xl mb-1 ml-1">+</span>Create New Interview
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {SideBarOption.map((option, index) => (
                <SidebarMenuItem key={index} className={"p-1"}>
                  <SidebarMenuButton
                    asChild
                    className={`p-5 ${path === option.path && "bg-blue-50"}`}
                  >
                    <Link href={option.path}>
                      <option.icon
                        className={`${path === option.path && "text-primary"}`}
                      />
                      <span
                        className={`text-[16px] font-medium ${
                          path === option.path && "text-primary"
                        }`}
                      >
                        {option.name}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
