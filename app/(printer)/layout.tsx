// /app/(public)/layout.tsx
'use client'

import Image from "next/image";
import React from "react";


const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="">
      {children}
    </main>
  );
};

export default PublicLayout;
