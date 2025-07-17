import { connectDB } from "@/lib/mongodb";
import Model from "@/models/model";
import ModelViewer from "./ModelViewer";
import DarkModeToggle from "@/components/dashboard/DarkModeToggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download } from "lucide-react";

interface ViewPageProps {
  params: { id: string };
}

export default async function ViewPage({ params }: ViewPageProps) {
  await connectDB();
  const model = await Model.findById(params.id).lean();
  if (!model) {
    return (
      <div className="min-h-screen transition-colors">
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold mb-2 dark:text-white">Model not found</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">The requested 3D model could not be found.</p>
              <Link href="/">
                <Button>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  // The file is served via /api/models/[id]/file
  const modelUrl = `/api/models/${params.id}/file`;
  return (
    <div className="min-h-screen transition-colors">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <Link href="/">
                  <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-white bg-transparent">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{model.name}</h1>
                  <p className="text-gray-600 dark:text-gray-300">{model.filename}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DarkModeToggle />
                <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                  {model.size}
                </Badge>
                <a href={modelUrl} download={model.filename}>
                  <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-white bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 3D Viewer */}
            <div className="lg:col-span-3">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-0">
                  <ModelViewer modelUrl={modelUrl} />
                </CardContent>
              </Card>
            </div>

            {/* Model Info */}
            <div className="space-y-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Model Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Name</label>
                    <p className="text-gray-900 dark:text-white">{model.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Filename</label>
                    <p className="text-gray-900 dark:text-white">{model.filename}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Upload Date</label>
                    <p className="text-gray-900 dark:text-white">{model.uploadDate?.toLocaleString?.() || String(model.uploadDate)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">File Size</label>
                    <p className="text-gray-900 dark:text-white">{model.size}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <p className="mb-2">
                      <strong>Mouse:</strong>
                    </p>
                    <ul className="space-y-1 ml-4">
                      <li>• Left click + drag: Rotate</li>
                      <li>• Right click + drag: Pan</li>
                      <li>• Scroll: Zoom in/out</li>
                    </ul>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <p className="mb-2">
                      <strong>Touch:</strong>
                    </p>
                    <ul className="space-y-1 ml-4">
                      <li>• One finger: Rotate</li>
                      <li>• Two fingers: Pan & Zoom</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
