'use client'

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Image from "next/image"
import { Skeleton } from "./ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface AvatarButtonProps {
  src?: string,
  name?: string,
  email?: string,
}

const AvatarButton = ({
  src = "",
  name = "",
  email = "",
} : AvatarButtonProps) => {

  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh(); // IMPORTANT: updates Server Components (Header)
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="hover:cursor-pointer relative border-2 border-transparent hover:border-gray-400 transition-colors duration-500"

      >
        <Avatar>
          <AvatarImage src={src} alt="profile-pic" width={250} height={250} />
          <AvatarFallback className="border-custom-light-gray border-2">
            {!!src
              ? <Skeleton className="size-7 rounded-full bg-gray-300" />
              : <Image src="/assets/icons/santa_claus.svg" alt="empty-profile-pic" width={250} height={250} className="object-cover size-7" />
            }
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-50" align="center">
        <DropdownMenuLabel className="flex flex-col gap-0.5 pb-3">
          <p className="text-ellipsis line-clamp-1">{name || <Skeleton className="h-4 w-38 bg-gray-300" />}</p>
          <p className="text-xs text-gray-500 text-ellipsis line-clamp-1">{email || <Skeleton className="h-3 w-25 bg-gray-300" />}</p>
        </DropdownMenuLabel>
        
        <DropdownMenuGroup>
          <DropdownMenuItem>
            My Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>

    </DropdownMenu>
  )
}
export default AvatarButton