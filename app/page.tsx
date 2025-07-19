import { fetchmodels } from "@/lib/data";
import { deleteModelAction } from "./action/deleteModelAction";
import { Suspense } from "react";
import DarkModeToggle from "@/components/dashboard/DarkModeToggle";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSklton";
import Bottom from "@/components/dashboard/Bottom";
export const dynamic = "force-dynamic"; // Force dynamic rendering for this page
export default async function DashboardPage() {
  const data = fetchmodels();
  return (
    <div className="min-h-screen transition-colors">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  3D Model Gallery
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Upload and manage your 3D models
                </p>
              </div>
              <div className="flex items-center gap-4">
                <DarkModeToggle />
                {/* <Badge
                    variant="secondary"
                    className="text-sm dark:bg-gray-700 dark:text-gray-300"
                  >
                    {models.length} modelsnce
                  </Badge> */}
              </div>
            </div>
          </div>
        </header>
        <Suspense fallback={<DashboardSkeleton />}>
          <Bottom data={data}  />
        </Suspense>
      </div>
    </div>
  );
}
