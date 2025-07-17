"use client";
import React, { Suspense, use } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ModelListProps {
  model: any;
  onDelete: (id: string) => void;
}
function Loader() {
  return (
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  );
}
export default function ModelList({ model, onDelete }: ModelListProps) {
  // const model = use(use(data).json());
  return (
    <div className="space-y-4">
      {model.map(() => (
        <Suspense fallback={<Loader />}>
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
                    {model.uploadDate?.toLocaleString?.() ||
                      String(model.uploadDate)}
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
              onClick={() => onDelete(model._id)}
              className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
              aria-label="Delete model"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </Card>
        </Suspense>
      ))}
    </div>
  );
}
