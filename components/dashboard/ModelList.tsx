"use client";
import React, { startTransition, Suspense, use } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ModelType } from "./Bottom";
import { deleteModelAction } from '@/app/action/deleteModelAction';

interface ModelListProps {
  models: ModelType[];
 
}
function Loader() {
  return (
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  );
}
export default function ModelList({ models,  }: ModelListProps) {
  const handleDelete = (id: string) => {
    if (!confirm('Delete this model?')) return;

    startTransition(() => {
      deleteModelAction(id);
    });
  };
  // const model = use(use(data).json());
  return (
    <div className="space-y-4">
      {models.map((model) => (
        <Card
          key={model._id}
          className="flex items-center gap-4 p-4 dark:bg-gray-800 dark:border-gray-700"
        >
          <Link
            href={`/view/${model._id}`}
            className="flex items-center gap-4 flex-1 min-w-0"
          >
            <img
              src={`/api/models/${model._id}/thumbnail`}
              alt={model.name}
              className="w-16 h-16 object-cover rounded bg-gray-100 dark:bg-gray-700 flex-shrink-0"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 dark:text-white truncate mb-1">
                {model.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 truncate mb-2">
                {model.filename}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <span>
                  {new Date(model.uploadDate).toLocaleString("en-US", {
                    month: "short", // Jan, Feb, Mar, etc.
                    day: "numeric", // 1, 2, 3...
                    // year: "numeric", // 2025
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true, // Optional, for AM/PM
                  })}
                </span>
                <Badge
                  variant="secondary"
                  className="dark:bg-gray-700 dark:text-gray-300"
                >
                  {model.size}
                </Badge>
              </div>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
              onClick={() => handleDelete(model._id)}
            className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
            aria-label="Delete model"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </Card>
      ))}
    </div>
  );
}
