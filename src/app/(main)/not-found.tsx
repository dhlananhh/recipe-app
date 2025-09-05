"use client";

import React from "react";
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container text-center py-20">
      <h1 className="text-9xl font-bold text-primary">
        404
      </h1>
      <h2 className="text-3xl font-semibold mt-4">
        Page Not Found
      </h2>
      <p className="text-muted-foreground mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">
          Return Home
        </Link>
      </Button>
    </div>
  )
}
