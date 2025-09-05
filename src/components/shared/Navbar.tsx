"use client";


import React from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CookingPot } from "lucide-react";


export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 h-16 z-50 w-full border-b bg-background/95 backdrop-blur 
    supports-[backdrop-filter]:bg-background/60">
      <div className="container h-full max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <CookingPot className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">
            Culinary
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/saved"
            className="text-sm font-medium hover:underline"
          >
            Saved Recipes
          </Link>
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </div>
    </header>
  );
}
