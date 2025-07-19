import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="bg-secondary border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-16" />
              <div>
                <Skeleton className="h-7 w-48 mb-1" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 3D Viewer Skeleton */}
          <div className="lg:col-span-3">
            <Card className="bg-secondary dark:border-gray-700 p-0">
              <CardContent className="p-0">
                <div className="relative  h-[350px] sm:h-[590px] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
                      <Skeleton className="h-4 w-32 mx-auto" />
                    </div>
                  </div>
                  {/* Controls Overlay Skeleton */}
                  <div className="absolute top-4 right-4">
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Model Info Skeleton */}
          <div className="space-y-6">
            <Card className="bg-secondary dark:border-gray-700">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index}>
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-secondary dark:border-gray-700">
              <CardHeader>
                <Skeleton className="h-6 w-20" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Skeleton className="h-4 w-12 mb-2" />
                  <div className="space-y-1 ml-4">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-3 w-36" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
                <div>
                  <Skeleton className="h-4 w-12 mb-2" />
                  <div className="space-y-1 ml-4">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
