import { z } from 'zod';

// Schema
// Mostly for validating request body/params

export const MapBoundSchema = z.object({
  north: z.number().min(-90).max(90),
  west: z.number().min(-180).max(180),
  south: z.number().min(-90).max(90),
  east: z.number().min(-180).max(180),
});
export type MapBound = z.infer<typeof MapBoundSchema>;
