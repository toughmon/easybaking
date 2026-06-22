import { z } from 'zod';

/**
 * Zod schemas are the single source of truth for recipe shapes.
 * TypeScript types are *inferred* from them (see exports below), so when a real
 * backend is wired in, the same schema can validate API responses at the edge.
 */

export const recipeDifficultySchema = z.enum(['easy', 'medium', 'hard']);

export const ingredientSchema = z.object({
  name: z.string(),
  amount: z.string(),
});

export const recipeStepSchema = z.object({
  order: z.number().int().positive(),
  description: z.string(),
  durationMinutes: z.number().int().nonnegative().optional(),
});

export const recipeSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  imageUrl: z.string(),
  category: z.string(),
  difficulty: recipeDifficultySchema,
  prepMinutes: z.number().int().nonnegative(),
  bakeMinutes: z.number().int().nonnegative(),
  servings: z.number().int().positive(),
  ingredients: z.array(ingredientSchema),
  steps: z.array(recipeStepSchema),
  tags: z.array(z.string()),
});

/** Lightweight projection used in lists/feeds (no ingredients/steps payload). */
export const recipeSummarySchema = recipeSchema.pick({
  id: true,
  title: true,
  summary: true,
  imageUrl: true,
  category: true,
  difficulty: true,
  prepMinutes: true,
  bakeMinutes: true,
});

export type RecipeDifficulty = z.infer<typeof recipeDifficultySchema>;
export type Ingredient = z.infer<typeof ingredientSchema>;
export type RecipeStep = z.infer<typeof recipeStepSchema>;
export type Recipe = z.infer<typeof recipeSchema>;
export type RecipeSummary = z.infer<typeof recipeSummarySchema>;
