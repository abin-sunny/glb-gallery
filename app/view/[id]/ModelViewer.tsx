"use client";
import React, { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Html,
  useProgress,
  useGLTF,
} from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

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

function Model({ url }: { url: string }) {
  const gltf = useGLTF(url);
  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);
  //  const scene = useMemo(() => {
  //   if (!gltf.scene) return null;
  //   return gltf.scene.clone();
  // }, [gltf.scene]);

  // if (!scene) return null;
  return <primitive object={scene} scale={1} />;
}

export default function ModelViewer({ modelUrl }: { modelUrl: string }) {
  const [resetCamera, setResetCamera] = useState(0);
  const { progress } = useProgress();

  // Don't use state updates directly in render
  const [shownProgress, setShownProgress] = useState(0);

  React.useEffect(() => {
    setShownProgress(progress);
  }, [progress]);
  return (
    <div className="relative h-[350px] sm:h-[590px] bg-linear-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="w-full h-full"
      >
        <Suspense fallback={<Loader />}>
          <Environment preset="studio" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Model url={modelUrl} />
          <OrbitControls
            key={resetCamera}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={1}
            maxDistance={20}
          />
        </Suspense>
      </Canvas>
      {/* Controls Overlay */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setResetCamera((prev) => prev + 1)}
          className="bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 dark:text-white"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
