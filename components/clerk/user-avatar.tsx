"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserIcon } from "@hugeicons/core-free-icons";

export function UserAvatar() {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="cursor-pointer">
            <Avatar>
              <AvatarFallback>
                <HugeiconsIcon icon={UserIcon} size={16} />
              </AvatarFallback>
            </Avatar>
          </button>
        </SignInButton>
      </SignedOut>
    </>
  );
}
