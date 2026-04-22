"use client";

import { Separator } from "@radix-ui/react-separator";
import {
  BadgeCheck,
  Bell,
  Briefcase,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Settings2,
  Sparkles,
  UserCircle,
  Users,
} from "lucide-react";
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/animate-ui/components/radix/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/animate-ui/primitives/radix/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useProfileData } from "@/modules/users/hooks/use-profile-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/ui/breadcrumb";

const DATA = {
  user: {
    name: "Skyleen",
    email: "skyleen@example.com",
    avatar:
      "https://pbs.twimg.com/profile_images/1909615404789506048/MTqvRsjo_400x400.jpg",
  },
  navMain: [
    {
      title: "Users",
      url: "#",
      icon: Users,
      id: "users",
    },
    {
      title: "Recruiters",
      url: "#",
      icon: Briefcase,
      id: "recruiters",
    },
    {
      title: "Profile",
      url: "#",
      icon: UserCircle,
      id: "profile",
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      id: "settings",
    },
  ],
};

export function DashboardClient() {
  const isMobile = useIsMobile();
  const [activeView, setActiveView] = React.useState("users");
  const { user: profileUser, isLoading: isProfileLoading } = useProfileData();

  const user = profileUser || DATA.user;

  const activeItem = DATA.navMain.find((item) => item.id === activeView);

  if (isProfileLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">Loading...</div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <span className="font-bold">JH</span>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
              <span className="truncate font-semibold">JobHub</span>
              <span className="truncate text-xs">Admin Dashboard</span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
              {DATA.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={activeView === item.id}
                    onClick={() => setActiveView(item.id)}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={user.avatar || user.profile_picture?.url}
                        alt={user.name}
                      />
                      <AvatarFallback className="rounded-lg">
                        {user.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user.name}
                      </span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={user.avatar || user.profile_picture?.url}
                          alt={user.name}
                        />
                        <AvatarFallback className="rounded-lg">
                          {user.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {user.name}
                        </span>
                        <span className="truncate text-xs">{user.email}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Sparkles />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{activeItem?.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {activeView === "users" && (
            <div className="flex flex-1 flex-col gap-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
                  <span className="text-muted-foreground">Total Users</span>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
                  <span className="text-muted-foreground">
                    Active Users Stats
                  </span>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
                  <span className="text-muted-foreground">
                    New Signups Stats
                  </span>
                </div>
              </div>
              {/* <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 p-4">
                                    <h2 className="text-lg font-semibold mb-4">Users Management</h2>
                                    {loading ? (
                                        <p className="text-muted-foreground">Loading users...</p>
                                    ) : error ? (
                                        <p className="text-destructive">Error: {error}</p>
                                    ) : usersData ? (
                                        <pre className="text-sm text-muted-foreground overflow-auto">
                                            {JSON.stringify(usersData, null, 2)}
                                        </pre>
                                    ) : (
                                        <p className="text-muted-foreground">No data available</p>
                                    )}
                                </div> */}
            </div>
          )}

          {activeView === "recruiters" && (
            <div className="flex flex-1 flex-col gap-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
                  <span className="text-muted-foreground">
                    Total Recruiters
                  </span>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
                  <span className="text-muted-foreground">Active Jobs</span>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
                  <span className="text-muted-foreground">
                    Pending Approvals
                  </span>
                </div>
              </div>
              <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 p-4">
                <h2 className="text-lg font-semibold mb-4">
                  Recruiters Management
                </h2>
                <p className="text-muted-foreground">
                  Recruiter list and approval workflow will go here.
                </p>
              </div>
            </div>
          )}

          {activeView === "profile" && (
            <div className="flex flex-1 flex-col gap-4">
              <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 p-4">
                <h2 className="text-lg font-semibold mb-4">My Profile</h2>
                <p className="text-muted-foreground">
                  Profile settings and information will go here.
                </p>
              </div>
            </div>
          )}

          {activeView === "settings" && (
            <div className="flex flex-1 flex-col gap-4">
              <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 p-4">
                <h2 className="text-lg font-semibold mb-4">Settings</h2>
                <p className="text-muted-foreground">
                  Application settings and configuration will go here.
                </p>
              </div>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
