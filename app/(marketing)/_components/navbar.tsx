"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, useAuth, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

export const Navbar = () => {
  const { userId, isLoaded } = useAuth();
  const scrolled = useScrollTop();

  return (
    // Tutorial put dark:bg-[#1f1f1f] but I think that's too light for my liking
    <div className={cn("z-50 bg-background fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm")}>
      <Logo/>
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {!isLoaded && (<Spinner/>)}
        {!userId && isLoaded && (
          <>
            <div>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button size="sm">
                  Try IlmMind for free
                </Button>
              </SignInButton>
            </div>
          </>
        )}
        {userId && isLoaded && (
          <>
          {/* Look up online later what asChild does to the button */}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">
                Enter IlmMind
              </Link>
            </Button>
            <UserButton afterSignOutUrl="/"/>
          </>
        )}
        <ModeToggle/>
      </div>
    </div>
  )
}