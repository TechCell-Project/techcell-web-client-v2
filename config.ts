import { z } from 'zod';

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_URL: z.string(),
  // URL_HOST_SOCKET_IO: z.string(),
  // NEXTAUTH_URL: z.string(),
  // NEXTAUTH_SECRET: z.string(),
  // GOOGLE_CLIENT_ID: z.string(),
  // GOOGLE_CLIENT_SECRET: z.string(),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
  NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string(),
  // CLOUDINARY_API_SECRET: z.string(),
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_BASE_URL,
  // URL_HOST_SOCKET_IO: process.env.URL_HOST_SOCKET_IO,
  // NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  // NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  // GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  // GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  // CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
});

if (!configProject.success) {
  console.error(configProject.error.issues);
  throw new Error(`Các giá trị khai báo trong file .env không hợp lệ: ${configProject.error.message}`);
}

const envConfig = configProject.data;
export default envConfig;
