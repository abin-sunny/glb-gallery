"use client";
import React, { useState } from "react";
import { Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import * as THREE from "three";
import { uploadModelAction } from "@/app/action/upload";
import { toast } from "sonner";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export default function UploadArea() {
  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const setupScene = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      preserveDrawingBuffer: true,
      antialias: true,
    });
    renderer.setSize(1024, 1024);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xffffff, 0);
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(1, 1, 2);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    return { canvas, renderer, scene, camera };
  };

  const processModel = (
    gltf: any,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera
  ) => {
    const model = gltf.scene;

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    model.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const distance = maxDim;
    camera.position.set(distance, distance, distance);
    camera.lookAt(0, 0, 0);

    scene.add(model);
  };

  const canvasToBlob = (
    canvas: HTMLCanvasElement,
    dataURL: string
  ): Promise<{ dataURL: string; blob: Blob }> => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve({ dataURL, blob });
          } else {
            reject(new Error("Failed to generate blob"));
          }
        },
        "image/png",
        1.0
      );
    });
  };

  const generateThumbnail = (
    arrayBuffer: ArrayBuffer
  ): Promise<{ dataURL: string; blob: Blob }> => {
    return new Promise((resolve, reject) => {
      const { canvas, renderer, scene, camera } = setupScene();

      const blob = new Blob([arrayBuffer], { type: "model/gltf-binary" });
      const url = URL.createObjectURL(blob);

      const loader = new GLTFLoader();
      loader.load(
        url,
        async (gltf) => {
          try {
            processModel(gltf, scene, camera);
            renderer.render(scene, camera);
            renderer.render(scene, camera);
            const dataURL = renderer.domElement.toDataURL("image/png", 1.0);

            try {
              const result = await canvasToBlob(canvas, dataURL);
              resolve(result);
            } catch (error) {
              reject(error instanceof Error ? error : new Error(String(error)));
            } finally {
              URL.revokeObjectURL(url);
              renderer.dispose();
            }
          } catch (error) {
            URL.revokeObjectURL(url);
            renderer.dispose();
            reject(error instanceof Error ? error : new Error(String(error)));
          }
        },
        undefined,
        (error) => {
          URL.revokeObjectURL(url);
          renderer.dispose();
          reject(error instanceof Error ? error : new Error(String(error)));
        }
      );
    });
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;
    const glbFiles = Array.from(files).filter((f) => f.name.endsWith(".glb"));
    if (glbFiles.length === 0) {
      toast.warning("Please upload .glb files only.");
      return;
    }
    for (const file of glbFiles) {
      const formData = new FormData();
      const bytes = await file.arrayBuffer();

      try {
        const { dataURL, blob } = await generateThumbnail(bytes);
        setImage(dataURL);

        formData.append("file", file);
        formData.append("thumbnail", blob, "thumbnail.png");

        toast.promise(uploadModelAction(formData), {
          loading: "Uploading...",
          success: "Model uploaded successfully",
          error: "Failed to upload model",
        });
      } catch (err) {
        toast.error("Upload failed");
        console.error(err);
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  return (
    // for mobile
    <Card className="mb-8 bg-secondary dark:border-gray-700">
      <CardContent className="p-6">
        <div className="block sm:hidden text-center">
          <input
            type="file"
            accept=".glb"
            multiple
            className="hidden"
            id="file-upload-mobile"
            onChange={(e) => handleFileUpload(e.target.files)}
          />
          <label htmlFor="file-upload-mobile">
            <Button asChild className="cursor-pointer">
              <span>
                <Plus className="w-4 h-4 mr-2" />
                Choose Files
              </span>
            </Button>
          </label>
        </div>

        {/* for desktoop */}
        <div
          className={`hidden sm:block  border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Upload 3D Models
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Drag and drop your .glb files here, or click to browse
          </p>
          <input
            type="file"
            accept=".glb"
            multiple
            className="hidden"
            id="file-upload"
            onChange={(e) => handleFileUpload(e.target.files)}
          />
          <label htmlFor="file-upload">
            <Button asChild className="cursor-pointer">
              <span>
                <Plus className="w-4 h-4 mr-2" />
                Choose Files
              </span>
            </Button>
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
