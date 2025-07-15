'use server'

import { connectDB } from '@/lib/mongodb';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { IncomingForm } from 'formidable';
import { Model } from 'mongoose';

export async function uploadModel(prevState: any, formData: FormData) {
  await connectDB();

  const name = formData.get('name') as string;
  const file = formData.get('file') as File;

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${uuid()}.glb`;
  const filepath = path.join(process.cwd(), 'public/uploads', filename);

  await fs.writeFile(filepath, buffer);

  const newModel = await Model.create({
    name,
    fileUrl: `/uploads/${filename}`,
  });

  return { success: true, model: newModel };
}
