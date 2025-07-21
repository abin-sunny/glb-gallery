"use server";

import { revalidatePath } from "next/cache";

export async function deleteModelAction(id: string) {
  const res = await fetch(`${process.env.NEXT_FRONTEND_URL}/api/models/${id}`, {
    method: "DELETE",
  });
  revalidatePath("/");
  if (!res.ok) {
    throw new Error("Failed to delete model");
  }
  // or whatever path needs to be updated
}
