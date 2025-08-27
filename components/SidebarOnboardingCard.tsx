import {
  ChevronRight,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";




type OnboardingProps = {
  avatars: { src: string; fallback: string }[];
  extraCount: number;
  title: string;
  progress: number; 
  description: string;
  actionLabel: string;
};




export default function SidebarOnboardingCard({ data }: { data: OnboardingProps }) {
  return (
    <div className="p-2">
      <div className="border-1 border-[#EBEBEB] rounded-lg p-4 relative ">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-2 h-6 w-6 p-0 text-[#a3a3a3] hover:text-[#171717]"
        >
          <X className="h-4 w-4 " />
        </Button>

        <div className="flex items-center space-x-[-12px] gap-1 mb-3 border-2 border-[#EBEBEB] rounded-full bg-white w-max">
          {data.avatars.map((a, i) => (
            <Avatar key={i} className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white ">
              <AvatarImage src={a.src} />
              <AvatarFallback className="text-xs">{a.fallback}</AvatarFallback>
            </Avatar>
          ))}
          <div className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-700">
            <span className="text-s font-medium">+{data.extraCount}</span>
          </div>
        </div>

        <h4 className="text-[#171717] font-semibold text-sm mb-1">
          {data.title}
        </h4>

        <div className="h-1 bg-[#e1e4ea] rounded-full mb-2">
          <div
            className="h-1 bg-[#1fc16b] rounded-full"
            style={{ width: `${data.progress}%` }}
          />
        </div>

        <p className=" text-xs mb-3 text-[#363636]">{data.description}</p>

        <div className="w-full text-[#171717] font-medium text-sm p-0 h-auto hover:bg-transparent underline flex">
          {data.actionLabel}
          <ChevronRight className="h-4 w-4 ml-2 " />
        </div>
      </div>
    </div>
  );
}