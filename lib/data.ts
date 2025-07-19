export const fetchmodels = async () => {
  const response = await fetch(`${process.env.NEXT_FRONTEND_URL}/api/models`);
  if (!response.ok) {
    throw new Error("Failed to fetch models");
  }
  return response.json();
}

// export const deletemodels=async ()=>
//   {
//     const response = await fetch("");
//     if (!response) {
//       throw new Error("Failed to delete model");
//     }
//   }