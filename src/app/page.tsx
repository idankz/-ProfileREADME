"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { FormContainer } from "@/components/form/FormContainer";
import { PreviewContainer } from "@/components/preview/PreviewContainer";
import { useProfileStore } from "@/store/useProfileStore";

export default function Home() {
  useEffect(() => {
    useProfileStore.getState().hydrateFromStorage();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Split-Screen Workspace */}
      <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-56px)] overflow-hidden">
        {/* Left Panel: Form Controls (45% on desktop) */}
        <FormContainer />

        {/* Right Panel: Live GitHub Markdown Preview (55% on desktop) */}
        <PreviewContainer />
      </main>
    </div>
  );
}
