import { z } from "zod";

// Zod validation schema
export const signInSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

// Zod validation schema
export const offerSchema = z.object({
  plan_type: z.string(),
  additions: z.array(z.enum(["refundable", "on_demand", "negotiable"])),
  user_id: z.number(),
  expired: z.date(),
  price: z.number().min(0),
});
export type OfferData = {
  plan_type: string;
  additions: string[];
  user_id: string;
  expired: string;
  price: number;
};