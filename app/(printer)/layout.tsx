// /app/(public)/layout.tsx
'use client'

import { Analytics } from "@vercel/analytics/next";
import Image from "next/image";
import React from "react";


const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="">
      <Analytics />
      {children}
    </main>
  );
};

export default PublicLayout;
