'use client'

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Image from "next/image"
import { Skeleton } from "../ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { memo } from "react"

export interface AvatarButtonProps {
  src?: string,
  name?: string,
  username: string,
  email?: string,
}

const AvatarButton = ({
  src = "",
  name = "",
  email = "",
  username,
} : AvatarButtonProps) => {
  
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh(); // IMPORTANT: updates Server Components (Header)
  };

  const navigateToProfile = ( username: string ) => {
    router.push(`/profile/${username}`);
  }

  const nameAndEmail = () => (
    <>
      <p className="text-ellipsis line-clamp-1">{name || <Skeleton className="h-4 w-38 bg-gray-300" />}</p>
      <p className="text-xs text-gray-500 text-ellipsis line-clamp-1">{email || <Skeleton className="h-3 w-25 bg-gray-300" />}</p>
    </>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={
          cn(
            "transition-colors duration-500 hover:cursor-pointer",
            "lg:border-2 lg:border-transparent lg:hover:border-gray-400 lg:rounded-full",
            "max-lg:p-2 max-lg:rounded-lg max-lg:hover:bg-custom-beigh"
          )
        }
      >
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage
              src={src}
              alt="profile-pic"
              width={250}
              height={250}
              loading={"lazy"}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback className="border-custom-light-gray border-2">
              {!!src
                ? <Skeleton className="size-7 rounded-full bg-gray-300" />
                : <Image src="/assets/icons/santa_claus.svg" alt="empty-profile-pic" width={250} height={250} className="object-cover size-7" />
              }
            </AvatarFallback>
          </Avatar>

          <div className="lg:hidden w-40">
            {nameAndEmail()}
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-50" align="center">
        <DropdownMenuLabel className="flex flex-col gap-0.5 pb-3 max-lg:hidden">
          {nameAndEmail()}
        </DropdownMenuLabel>
        
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={()=> navigateToProfile(username)}>
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
export default memo( AvatarButton )