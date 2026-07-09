import React, { Suspense } from "react";
import { DirectoryPage } from "../../features/directory";

export default function Page() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Loading Directory...</div>}>
      <DirectoryPage />
    </Suspense>
  );
}
