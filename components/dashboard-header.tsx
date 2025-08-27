// "use client"

// import type { ReactNode } from "react"
// import { Bell } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// interface DashboardHeaderProps {
//   user: {
//     name: string
//     avatar?: string
//     status?: "online" | "offline" | "away"
//   }
//   welcomeMessage?: string
//   actions?: ReactNode
//   className?: string
// }

// export function DashboardHeader({ user, welcomeMessage, actions, className = "" }: DashboardHeaderProps) {
//   const getStatusColor = (status?: string) => {
//     switch (status) {
//       case "online":
//         return "bg-green-500"
//       case "away":
//         return "bg-yellow-500"
//       case "offline":
//         return "bg-gray-400"
//       default:
//         return "bg-green-500"
//     }
//   }

//   const getInitials = (name: string) => {
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//   }

//   return (
//     <div className={`bg-white border-b border-[#ebebeb] px-4 lg:px-6 py-4 ${className}`}>
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="relative">
//             <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
//               <AvatarImage src={user.avatar || "/placeholder.svg"} />
//               <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
//             </Avatar>
//             <span
//               className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 sm:h-3 sm:w-3 ${getStatusColor(user.status)} border-2 border-white rounded-full`}
//             ></span>
//           </div>
//           <div className="min-w-0">
//             <h1 className="text-[#171717] font-semibold text-base sm:text-lg truncate">{user.name}</h1>
//             {welcomeMessage && <p className="text-[#7b7b7b] text-xs sm:text-sm truncate">{welcomeMessage}</p>}
//           </div>
//         </div>

//         <div className="flex items-center gap-2 sm:gap-4">
//           {actions}
//           <div className="relative">
//             <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-[#7b7b7b]" />
//             <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-red-500 border border-white rounded-full"></span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
