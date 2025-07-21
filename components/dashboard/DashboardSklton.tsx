import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <>
      {/* Controls Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Skeleton className="h-10 w-full  border border-gray-200" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 border border-gray-200" />
          <Skeleton className="h-10 w-10 border border-gray-200" />
        </div>
      </div>

      {/* Models Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <ModelCardSkeleton key={index} />
        ))}
      </div>
    </>
  );
}

export function ModelCardSkeleton() {
  return (
    <Card className="hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow group bg-secondary dark:border-gray-700">
      <CardContent className="p-4">
        <div className="aspect-square mb-2">
          <Skeleton className="w-full h-full object-cover rounded bg-gray-100 dark:bg-gray-700 border border-gray-200 " />
        </div>
        <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 mb-2 border border-gray-200">
          <span>
            <Skeleton className="h-4 w-32 mb-1 border border-gray-200" />
          </span>
          <span className="text-xs">
            <Skeleton className="h-4 w-20" />
          </span>
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-16 rounded dark:bg-gray-700" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
export function ModelListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="bg-secondary dark:border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="shrink-0">
              <Skeleton className="w-16 h-16 rounded-lg" />
            </div>
            <div className="flex-1 min-w-0">
              <Skeleton className="h-5 w-3/4 mb-1" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
            <div className="shrink-0">
              <Skeleton className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function UploadSkeleton() {
  return (
    <Card className="mb-8 bg-secondary dark:border-gray-700">
      <CardContent className="p-6">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center animate-pulse">
          <div className="mx-auto h-12 w-12 bg-gray-200 dark:bg-gray-600 rounded mb-4" />
          <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-48 mx-auto mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-64 mx-auto mb-4" />
          <div className="h-10 bg-gray-200 dark:bg-gray-600 rounded w-32 mx-auto" />
        </div>
      </CardContent>
    </Card>
  );
}
