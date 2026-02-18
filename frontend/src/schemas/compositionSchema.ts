import { z } from "zod";

export const compositionSchema = z.object({
  productId: z.coerce.number().min(1, "Selecione um produto"),
  rawMaterialId: z.coerce.number().min(1, "Selecione uma matéria-prima"),
  quantityRequired: z.coerce.number().min(0.01, "A quantidade deve ser maior que zero"),
});

export type CompositionFormInput = z.input<typeof compositionSchema>;
export type CompositionFormData = z.output<typeof compositionSchema>;