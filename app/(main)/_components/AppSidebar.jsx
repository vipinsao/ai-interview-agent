"use client";
import { useState, useEffect } from "react";
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
import { usePathname, useRouter } from "next/navigation";

export function AppSidebar() {
  const path = usePathname();
  const router = useRouter();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Function to check screen width
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };

    checkScreenSize(); // run on mount
    window.addEventListener("resize", checkScreenSize); // update on resize

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  const handleClick = () => {
    router.replace("/dashboard/create-interview");
  };

  return (
    <>
      <Sidebar
        defaultOpen={isDesktop ? true : false}
        className="h-full z-40 bg-white shadow-lg transition-transform duration-300 ease-in-out
        fixed md:relative top-0 left-0"
      >
        <SidebarHeader className="flex flex-col items-center">
          <Link href={"/"}>
            <Image
              src="/logo.png"
              alt="Logo"
              width={60}
              height={60}
              className="w-[70px]"
            />
          </Link>

          <Button className="mt-4 w-full cursor-pointer" onClick={handleClick}>
            <span className="text-xl mb-1 ml-1">+</span>Create New Interview
          </Button>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {SideBarOption.map((option, index) => (
                <SidebarMenuItem key={index} className="p-1">
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
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter />
      </Sidebar>
    </>
  );
}
