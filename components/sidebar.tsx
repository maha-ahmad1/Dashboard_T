import {
  ChevronsUpDown,
} from "lucide-react";
import Image from "next/image";
import SidebarNav from "./SidebarNav";
import SidebarOnboardingCard from "./SidebarOnboardingCard";
import SidebarUserProfile from "./SidebarUserProfile";


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
  progress: number; // 0–100
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


export default function Sidebar({ logo, sections, onboarding, user }: SidebarProps) {
  return (
    <div className="w-70 bg-white border-r border-[#ebebeb] h-screen flex flex-col justify-between px-4">
      {/* Logo Section */}
      <div className="p-4  pt-6 border-b border-[#ebebeb] h-20">
        <div className="flex items-center gap-3 ">
          <Image src={logo} alt="logo" width={35} height={35} />
          <ChevronsUpDown className="h-4 w-4 text-[#a3a3a3]" />
        </div>
      </div>

      {/* Navigation */}
      <SidebarNav sections={sections} />

      {/* Onboarding (optional) */}
      {onboarding && <SidebarOnboardingCard data={onboarding} />}

      {/* User Profile */}
      <SidebarUserProfile user={user} />
    </div>
  );
}