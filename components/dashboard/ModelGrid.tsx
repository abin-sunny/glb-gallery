"use client";
import React, { startTransition, use } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ModelType } from "./Bottom";
import { deleteModelAction } from '@/app/action/deleteModelAction';

interface ModelGridProps {
  models: ModelType[];

}

export default function ModelGrid({ models }: ModelGridProps) {
  const handleDelete = (id: string) => {
    if (!confirm('Delete this model?')) return;

    startTransition(() => {
      deleteModelAction(id);
    });
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {models.map((model) => (
        <Card
          key={model._id}
          className=" hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow group dark:bg-gray-800 dark:border-gray-700"
        >
          <CardContent className="p-4">
            <Link href={`/view/${model._id}`}>
              <div className="aspect-square">
                {" "}
                <img
                  src={`/api/models/${model._id}/thumbnail`}
                  alt={model.name}
                  className="w-full h-full object-cover rounded mb-2 bg-gray-100 dark:bg-gray-700"
                  loading="lazy"
                />
              </div>

              <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
                <span>
                  <h3 className="font-medium text-gray-900 dark:text-white truncate mb-1 q  ">
                    {model.name}
                  </h3>
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(model.uploadDate).toLocaleString("en-US", {
                    month: "short", // Jan, Feb, Mar, etc.
                    day: "numeric", // 1, 2, 3...
                    // year: "numeric", // 2025
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true, // Optional, for AM/PM
                  })}
                </span>
              </div>
              {/* <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                {model.filename}
              </p> */}
            </Link>
            <div className="flex items-center justify-between">
              <Badge
                variant="secondary"
                className="dark:bg-gray-700 dark:text-gray-300"
              >
                {model.size}
              </Badge>

              <Button
                variant="ghost"
                size="icon"
                onClick={() =>handleDelete(model._id)}
                className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                aria-label="Delete model"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
