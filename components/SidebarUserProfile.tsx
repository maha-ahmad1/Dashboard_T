import {
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";


type UserProps = {
  name: string;
  email: string;
  avatar: string;
  fallback: string;
  verified?: boolean;
};


export default function SidebarUserProfile({ user }: { user: UserProps }) {
  return (
    <div className="p-4 border-t border-[#ebebeb]">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.fallback}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-[#171717] font-semibold text-sm truncate">
              {user.name}
            </h4>
            {user.verified && (
              <Image
                src="/verified-fill.svg"
                alt="verified"
                width={20}
                height={20}
              />
            )}
          </div>
          <p className="text-[#676767] text-xs truncate">{user.email}</p>
        </div>
        <ChevronRight className="h-4 w-4 text-[#a3a3a3] flex-shrink-0" />
      </div>
    </div>
  );
}
