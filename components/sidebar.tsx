import { ChevronsUpDown, Menu, X } from "lucide-react";
import Image from "next/image";
import SidebarNav from "./SidebarNav";
import SidebarOnboardingCard from "./SidebarOnboardingCard";
import SidebarUserProfile from "./SidebarUserProfile";
import { useState } from "react";

type NavigationItem = {
  icon: React.ComponentType<any>;
  label: string;
  active?: boolean;
};

type NavigationSection = {
  title: string;
  items: NavigationItem[];
};

type OnboardingProps = {
  avatars: { src: string; fallback: string }[];
  extraCount: number;
  title: string;
  progress: number;
  description: string;
  actionLabel: string;
};

type UserProps = {
  name: string;
  email: string;
  avatar: string;
  fallback: string;
  verified?: boolean;
};

type SidebarProps = {
  logo: string;
  sections: NavigationSection[];
  onboarding?: OnboardingProps;
  user: UserProps;
};

export default function Sidebar({
  logo,
  sections,
  onboarding,
  user,
}: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open sidebar"
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-[9999] p-2 bg-white rounded shadow"
      >
        <Menu className="h-5 w-5 text-[#333]" />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 transform transition-transform duration-200
    ${open ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0 md:static z-40 
    w-64 md:w-70 bg-white border-r border-[#ebebeb] h-screen flex flex-col justify-between px-4`}
      >
        <div className="p-4 pt-6 border-b border-[#ebebeb] h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src={logo} alt="logo" width={35} height={35} />
            <ChevronsUpDown className="h-4 w-4 text-[#a3a3a3]" />
          </div>

          <button
            aria-label="Close sidebar"
            onClick={() => setOpen(false)}
            className="md:hidden p-2 rounded hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-[#333]" />
          </button>
        </div>

        <SidebarNav sections={sections} />

        {onboarding && <SidebarOnboardingCard data={onboarding} />}

        <SidebarUserProfile user={user} />
      </aside>
    </>
  );
}
