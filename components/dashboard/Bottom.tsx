"use client";
import React, { use, useState } from "react";
import UploadArea from "./UploadArea";
import { Button } from "../ui/button";
import ModelGrid from "./ModelGrid";
import ModelList from "./ModelList";
import SearchBar from "./SearchBar";
import { Grid, List } from "lucide-react";
// import { revalidatePath } from "next/cache";
interface BottomProps {
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

export default function Bottom({ data }: BottomProps) {
  const models = use(data);
  // const models=use(model.json()) as ModelType[];
  // console.log(models);
  // return (
  //   <div>
  //     {models.map((item) => (
  //       <div key={item._id}>{item.name}</div>
  //     ))}
  //   </div>
  // );

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredModels = models.filter(
    (models) =>
      models.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      models.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleUpload = (model: any) => {
  //   setModels((prev) => [model, ...prev]);
  // };

  // const handleDelete = async (id: string) => {
  //   if (!confirm("Are you sure you want to delete this model?")) return;
  //   const res = await fetch(`/api/models/${id}`, { method: "DELETE" });
  //   // deleteModel(model._id);
  //   if (res.ok) {
  //     // setModels((prev) => prev.filter((m) => m._id !== id));
  //   } else {
  //     alert("Failed to delete model");
  //   }
  // };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <UploadArea />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline-solid"}
              size="sm"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline-solid"}
              size="sm"
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Model Grid/List */}
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
      </div>
    </>
  );
}
