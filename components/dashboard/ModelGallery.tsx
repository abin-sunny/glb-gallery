"use client";
import React, { use, useState } from "react";
import { Button } from "../ui/button";
import ModelGrid from "./ModelGrid";
import ModelList from "./ModelList";
import SearchBar from "./SearchBar";
import { Grid, List } from "lucide-react";
interface ModelGalleryProps {
  data: Promise<ModelType[]>;
}
export interface ModelType {
  _id: string;
  name: string;
  filename: string;
  size: string;
  thumbnail: Buffer;
  uploadDate: string;
}

export default function ModelGallery({ data }: ModelGalleryProps) {
  const models = use(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredModels = models.filter(
    (models) =>
      models.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      models.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="flex gap-2">
          <Button
          className="w-10 h-10"
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
           className="w-10 h-10"
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {filteredModels.length === 0 ? (
        <div className="text-center text-gray-400 dark:text-gray-500 py-12">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No models found
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Upload your first 3D model to get started"}
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <ModelGrid models={filteredModels} />
      ) : (
        <ModelList models={filteredModels} />
      )}
    </>
  );
}
