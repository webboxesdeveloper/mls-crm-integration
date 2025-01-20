import { z } from 'zod';

const mlsSchema = z.object({
  mls_name: z.string().nonempty("MLS name is required"),
  mls_id: z
    .union([z.number(), z.string()])
    .transform((val) => parseInt(val, 10))
    .refine((val) => Number.isInteger(val) && val > 0, "MLS ID must be a positive integer"),
  street_address: z.string().nonempty("Street address is required"),
  city: z.string().nonempty("City is required"),
  state: z.string().nonempty("State is required"),
  zip_code: z
    .union([z.number(), z.string()])
    .transform((val) => parseInt(val, 10))
    .refine((val) => Number.isInteger(val) && val.toString().length === 5, "Zip code must be a 5-digit number"),
  list_price: z
    .union([z.number(), z.string()])
    .transform((val) => parseInt(val, 10))
    .refine((val) => Number.isInteger(val) && val > 0, "List price must be a positive integer"),
  list_date: z
    .union([z.number(), z.string()])
    .transform((val) => parseInt(val, 10))
    .refine((val) => Number.isInteger(val) && val > 0, "List date must be a valid Unix timestamp"),
  bedrooms: z
    .union([
        z.string().refine(val => !isNaN(parseInt(val)), "Bedrooms must be a non-negative integer").transform(val => parseInt(val, 10)),
        z.number().int().nonnegative(),
        z.null(),
    ])
    .optional(),
  full_baths: z
    .union([
        z.string().refine(val => !isNaN(parseInt(val)), "Full baths must be a non-negative integer").transform(val => parseInt(val, 10)),
        z.number().int().nonnegative(),
        z.null(),
    ])
    .optional(),
  half_baths: z
    .union([
      z.string().refine(val => !isNaN(parseInt(val)), "half_baths must be a valid number string").transform(val => parseInt(val, 10)),
      z.number().int().nonnegative(),
      z.null(),
    ])
    .optional(),
  size: z
    .union([
        z.string().refine(val => !isNaN(parseInt(val)), "Size must be a non-negative integer").transform(val => parseInt(val, 10)),
        z.number().int().nonnegative(),
        z.null(),
    ])
    .optional()
});

export default mlsSchema;