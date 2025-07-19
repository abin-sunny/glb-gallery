export interface ModelType {
  _id: string;
  name: string;
  filename: string;
  file:Buffer;
  size: string;
  thumbnail: Buffer;
  uploadDate: string;
}