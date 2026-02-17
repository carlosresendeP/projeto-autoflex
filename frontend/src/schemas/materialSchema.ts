import { z } from "zod";

export const materialSchema = z.object({
  code: z.string().min(3, "Mínimo 3 caracteres").toUpperCase(),
  name: z.string().min(3, "Mínimo 3 caracteres"),
  stockQuantity: z.coerce.number().min(0, "O estoque não pode ser negativo"),
});

// Tipos para o formulário seguindo seu padrão
export type MaterialFormInput = z.input<typeof materialSchema>;
export type MaterialFormData = z.output<typeof materialSchema>;