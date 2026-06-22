import { MockRecipeRepository } from './recipe.mock';
import type { RecipeRepository } from './recipe.repository';

/**
 * ───────────────────────────────────────────────────────────────────────────
 *  THE SWAP POINT
 * ───────────────────────────────────────────────────────────────────────────
 * This is the ONLY line that changes when a real backend arrives. Implement
 * `RecipeRepository` against Supabase / Firebase / your REST API and bind it
 * here — query hooks, components, and screens stay untouched.
 *
 *   export const recipeRepository: RecipeRepository = new SupabaseRecipeRepository(supabase);
 */
export const recipeRepository: RecipeRepository = new MockRecipeRepository();

export type { RecipeRepository, RecipeListParams } from './recipe.repository';
