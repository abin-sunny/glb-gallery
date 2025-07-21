"use client";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
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
  const { camera, scene } = useThree();

  useEffect(() => {
    const model = gltf.scene.clone();
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    model.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const distance = maxDim === 0 ? 5 : maxDim * 1.5;
    camera.position.set(distance, distance, distance);
    camera.lookAt(0, 0, 0);

    // Remove previous model if any
    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }
    scene.add(model);

    // Clean up
    return () => {
      scene.remove(model);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gltf, camera, scene]);

  return null;
}

export default function ModelViewer({ modelUrl }: { modelUrl: string }) {
  const [resetCamera, setResetCamera] = useState(0);
  const { progress } = useProgress();
  const [shownProgress, setShownProgress] = useState(0);

  React.useEffect(() => {
    setShownProgress(progress);
  }, [progress]);
  return (
    <div className="relative h-[350px] sm:h-[590px] bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="w-full h-full"
      >
        <Suspense fallback={<Loader />}>
          <Environment preset="apartment" />
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
          className="bg-white/90 hover:bg-secondary/90 dark:hover:bg-gray-800 dark:text-white"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}