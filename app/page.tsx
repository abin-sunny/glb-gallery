"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Upload, Grid, List, Search, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch("/api/models");
        if (!res.ok) throw new Error("Failed to fetch models");
        const data = await res.json();
        setModels(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const filteredModels = models.filter(
    (model) =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    const glbFiles = Array.from(files).filter((f) => f.name.endsWith(".glb"));
    if (glbFiles.length === 0) {
      alert("Please upload a .glb file only."); // or show error on UI
      return; // prevent further upload logic
    }

    for (const file of glbFiles) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("Upload failed");
        continue;
      }

      const uploadedModel = await res.json();
      setModels((prev) => [uploadedModel, ...prev]); // assuming state exists
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                GLB Gallery
              </h1>
              <p className="text-gray-600">Upload and manage your 3D models</p>
            </div>
            <Badge variant="secondary" className="text-sm">
              {models.length} models
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Upload Section */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-10 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Upload 3D Models
              </h3>
              <p className="text-gray-600 mb-4">
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

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Models Grid/List */}
        {filteredModels.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Upload className="mx-auto h-16 w-16" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No models found
              </h3>
              <p className="text-gray-600">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Upload your first 3D model to get started"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {filteredModels.map((model) => (
              <Link key={model._id} href={`/view/${model._id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent
                    className={
                      viewMode === "grid"
                        ? "p-4"
                        : "p-4 flex items-center gap-4"
                    }
                  >
                    <div
                      className={viewMode === "grid" ? "mb-4" : "flex-shrink-0"}
                    >
                      <div
                        className={`bg-gray-100 rounded-lg overflow-hidden ${
                          viewMode === "grid" ? "aspect-square" : "w-16 h-16"
                        }`}
                      >
                        <img
                          src={model.thumbnail || "/placeholder.svg"}
                          alt={model.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div
                      className={viewMode === "grid" ? "" : "flex-1 min-w-0"}
                    >
                      <h3 className="font-medium text-gray-900 truncate mb-1">
                        {model.name}
                      </h3>
                      <p className="text-sm text-gray-600 truncate mb-2">
                        {model.filename}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{model.uploadDate}</span>
                        <span>{model.size}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
