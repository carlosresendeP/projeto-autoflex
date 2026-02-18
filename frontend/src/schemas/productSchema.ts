import * as z from "zod";

// Schema centralizado para o Produto
export const productSchema = z.object({
  code: z
    .string()
    .min(3, "O código deve ter pelo menos 3 caracteres")
    .toUpperCase(), // Transforma automaticamente em MAIÚSCULO
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  value: z.coerce.number().min(0.01, "O valor deve ser maior que zero"),
});

export type ProductFormData = z.output<typeof productSchema>;
export type ProductFormInput = z.input<typeof productSchema>;
