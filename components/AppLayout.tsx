"use client"

import {
  Home,
  Users,
  Network,
  List,
  FileText,
  Tag,
  Palette,
  Package,
  Settings,
  Puzzle,
  HelpCircle,
} from "lucide-react";
import Sidebar from "./sidebar";

export default function AppLayout() {
  return (
    <Sidebar
      logo="/Synergy.svg"
      sections={[
        {
          title: "",
          items: [{ icon: Home, label: "Home", active: true }],
        },
        {
          title: "TEAM MANAGEMENT",
          items: [
            { icon: Users, label: "Members" },
            { icon: Network, label: "Departments" },
            { icon: List, label: "Bulk Adjustments" },
          ],
        },
        {
          title: "LEADS MANAGEMENT",
          items: [
            { icon: FileText, label: "Leads" },
            { icon: Tag, label: "Tags" },
          ],
        },
        {
          title: "BRAND & PRODUCTS",
          items: [
            { icon: Palette, label: "Customization" },
            { icon: Package, label: "Products" },
          ],
        },
        {
          title: "CONFIGURATION",
          items: [
            { icon: Puzzle, label: "Integrations" },
            { icon: Settings, label: "Settings" },
          ],
        },
        {
          title: "SUPPORT",
          items: [{ icon: HelpCircle, label: "FAQs" }],
        },
      ]}  
      onboarding={{
        avatars: [
          { src: "/image1.png", fallback: "HY" },
          { src: "/image2.png", fallback: "DV" },
          { src: "/image3.png", fallback: "EC" },
        ],
        extraCount: 4,
        title: "Onboard your team members",
        progress: 33,
        description: "Upload your team via CSV",
        actionLabel: "Onboard your team",
      }}
      user={{
        name: "Sophia Williams",
        email: "sophia@alignui.com",
        avatar: "/image5.png",
        fallback: "SW",
        verified: true,
      }}
    />
  );
}
