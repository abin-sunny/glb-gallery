"use client";
import React, { useState } from "react";
import { Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { modelToImage } from "@/utils/modelToImage";
import { uploadModelAction } from "@/app/action/upload";

export default function UploadArea() {
  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const dataURLToBlob = (dataUrl: string): Blob => {
    const [header, base64] = dataUrl.split(",");
    const mimeMatch = header.match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : "image/png";
    const byteString = atob(base64);
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([byteArray], { type: mime });
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;
    const glbFiles = Array.from(files).filter((f) => f.name.endsWith(".glb"));
    if (glbFiles.length === 0) {
      alert("Please upload a .glb file only.");
      return;
    }
    for (const file of glbFiles) {
      const formData = new FormData();
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const dataUrl = await modelToImage(buffer.buffer);
      setImage(dataUrl);
      const thumbnailBlob = dataURLToBlob(dataUrl);
      formData.append("file", file);
      formData.append("thumbnail", thumbnailBlob, "thumbnail.png");

      try {
        const result = await uploadModelAction(formData);
        console.log("Upload success:", result);
      } catch (err) {
        console.error("Upload failed", err);
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
