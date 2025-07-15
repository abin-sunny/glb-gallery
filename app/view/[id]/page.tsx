"use client";

import { useEffect, useState, Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Html,
  useProgress,
  useGLTF,
} from "@react-three/drei";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, RotateCcw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function Model({ url }: { url: string }) {
  if (!url) return null;
  const gltf = useGLTF(url);
  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);
  return <primitive object={scene} scale={1} />;
}

export default function ViewPage() {
  const { id } = useParams();
  const [model, setModel] = useState<any>(null);
  const [resetCamera, setResetCamera] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let currentBlobUrl: string | null = null;

    const fetchModel = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/models/${id}`);
        if (!res.ok) throw new Error("Not found");

        const data = await res.json();

        const fileRes = await fetch(`/api/models/${id}/file`);
        if (!fileRes.ok) throw new Error("File fetch failed");

        const blob = await fileRes.blob();
        currentBlobUrl = URL.createObjectURL(blob);

        setModel({ ...data, blobUrl: currentBlobUrl });
        setLoading(false);
      } catch {
        setError(true);
      }
    };

    fetchModel(); // Clean up blob URL when component unmounts
    return () => {
      if (currentBlobUrl) {
        URL.revokeObjectURL(currentBlobUrl);
        currentBlobUrl = null;
      }
    };
  }, [id]);

  useEffect(() => {
    if (model?.blobUrl) {
      useGLTF.preload(model.blobUrl);
    }
  }, [model?.blobUrl]);

  function Loader() {
    const { progress } = useProgress();
    return (
      <Html center>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">{progress.toFixed(0)}% loaded</p>
        </div>
      </Html>
    );
  }
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading ...</p>
        </div>
      </div>
    );
  }
  if (!model || error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Model not found</h2>
            <p className="text-gray-600 mb-4">
              The requested 3D model could not be found.
            </p>
            <Link href="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {model.name}
                </h1>
                {/* <p className="text-gray-600">{model.filename}</p> */}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{model.size || "Unknown size"}</Badge>
              <a href={model.blobUrl} download>
                <Button variant="outline" size="sm">
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
            <Card>
              <CardContent className="p-0">
                <div className="relative h-[600px] bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                  <Canvas
                    camera={{ position: [0, 0, 5], fov: 50 }}
                    className="w-full h-full"
                  >
                    {/* <Suspense fallback={<Loader />}> */}
                    <Environment preset="studio" />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <Environment preset="studio" />
                    {/* Only the GLB model loading goes inside Suspense */}
                    <Suspense fallback={<Loader />}>
                      {model?.blobUrl ? <Model url={model.blobUrl} /> : null}
                    </Suspense>{" "}
                    <OrbitControls
                      key={resetCamera}
                      enablePan
                      enableZoom
                      enableRotate
                      minDistance={1}
                      maxDistance={20}
                    />
                    {/* </Suspense> */}
                  </Canvas>

                  {/* Camera Reset */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setResetCamera((prev) => prev + 1)}
                      className="bg-white/90 hover:bg-white"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Name
                  </label>
                  <p className="text-gray-900">{model.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Filename
                  </label>
                  <p className="text-gray-900">{model.filename}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Upload Date
                  </label>
                  <p className="text-gray-900">
                    {new Date(model.uploadDate).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    File Size
                  </label>
                  <p className="text-gray-900">{model.size || "Unknown"}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <div>
                  <strong>Mouse:</strong>
                  <ul className="ml-4 list-disc">
                    <li>Left click + drag: Rotate</li>
                    <li>Right click + drag: Pan</li>
                    <li>Scroll: Zoom</li>
                  </ul>
                </div>
                <div>
                  <strong>Touch:</strong>
                  <ul className="ml-4 list-disc">
                    <li>One finger: Rotate</li>
                    <li>Two fingers: Pan & Zoom</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
