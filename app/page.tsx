import { fetchmodels } from "@/lib/data";
import { Suspense } from "react";
import DarkModeToggle from "@/components/dashboard/DarkModeToggle";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSklton";
import UploadArea from "@/components/dashboard/UploadArea";
import ModelGallery from "@/components/dashboard/ModelGallery";
export const dynamic = "force-dynamic"; // Force dynamic rendering for this page
export default async function DashboardPage() {
  const data = fetchmodels();
  return (
    <div className="min-h-screen transition-colors">
      <div className="min-h-screen bg-background">
        {/* Header */}
<header className="bg-gradient-to-r from-secondary to-secondary/80 border-b border-gray-200 dark:border-gray-800 shadow-sm py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <span className="text-primary">Model</span> Vault
          </h1>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
            Your 3D model management solution
          </p>
              </div>
              <div className="flex items-center space-x-4">
          <DarkModeToggle />
              </div>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <UploadArea />
          <Suspense fallback={<DashboardSkeleton />}>
            <ModelGallery data={data} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
