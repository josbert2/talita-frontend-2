import { z } from "zod";

// Convierte el schema de la tabla 'menus' a un esquema zod
export const menuSchema = z.object({
  id: z.number(),
  categoria_id: z.number().nullable(),
  nombre: z.string(),
  descripcion: z.string().nullable(),
  ingredientes: z.string().nullable(),
  precio: z.number().nullable(),
  precioOferta: z.number().nullable(),
  stock: z.number().nullable(),
  imagen: z.string().nullable(),
  tipo: z.string().nullable(),
  user_id: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Menu = z.infer<typeof menuSchema>;