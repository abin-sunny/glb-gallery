"use client";
import React, { use } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ModelGridProps {
  model: any;
  onDelete: (id: string) => void;
}

export default function ModelGrid({ model, onDelete }: ModelGridProps) {
  // const model = use(use(data).json());

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {model.map(() => (
        <Card key={model._id} className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4">
            <Link href={`/view/${model._id}`}>
              <img
                src={`/api/models/${model._id}/thumbnail`}
                alt={model.name}
                className="w-full h-40 object-cover rounded mb-2 bg-gray-100 dark:bg-gray-700"
                loading="lazy"
              />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {model.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                {model.filename}
              </p>
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
                onClick={() => onDelete(model._id)}
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
