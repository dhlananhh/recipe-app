"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface BlurInProps {
  children: ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
}

export function BlurIn({
  children,
  className,
  variant,
  duration = 0.5,
}: BlurInProps) {
  const variants = variant || {
    hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
    visible: { y: 0, opacity: 1, filter: "blur(0px)" },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={ { duration } }
      variants={ variants }
      className={ cn("pointer-events-none", className) }
    >
      { children }
    </motion.div>
  );
}
