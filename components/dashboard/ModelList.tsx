"use client";
import React, { startTransition } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { ModelType } from "./ModelGallery";
import { deleteModelAction } from "@/app/action/deleteModelAction";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
interface ModelListProps {
  models: ModelType[];
}

export default function ModelList({ models }: ModelListProps) {
  const handleDelete = async (id: string) => {
    toast.promise(deleteModelAction(id), {
      loading: "Deleting...",
      success: "Model deleted successfully",
      error: "Failed to delete model",
    });
  };
  return (
    <div className="space-y-4 flex flex-col">
      {models.map((model) => (
        <Card
          key={model._id}
          className="hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow group dark:bg-gray-800 dark:border-gray-700"
        >
          <CardContent className="p-4 flex items-center gap-4">
            <Link
              href={`/view/${model._id}`}
              className="flex items-center gap-4 flex-1"
            >
              <div className="flex-shrink-0">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden w-16 h-16">
                  <Image
                    width={64}
                    height={64}
                    src={`/api/models/${model._id}/thumbnail`}
                    alt={model.name}
                    className="w-16 h-16 object-cover rounded bg-gray-100 dark:bg-gray-700 shrink-0"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="font-medium text-gray-900 dark:text-white mb-1
             truncate sm:truncate-none max-w-[10ch] sm:max-w-none"
                >
                  {model.name}
                </h3>

                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>
                    {" "}
                    {new Date(model.uploadDate).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                  <span>{model.size}</span>
                </div>
              </div>
            </Link>

            <div className="flex-shrink-0">
              <AlertDialog>
                <AlertDialogTrigger>
                  {" "}
                  <Trash2 className="w-5 h-5 text-red-400" />
                </AlertDialogTrigger>
                <AlertDialogContent className="dark:bg-gray-800 dark:border-gray-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="dark:text-white">
                      Delete Model
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(model._id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
