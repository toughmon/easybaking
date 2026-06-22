import type { Recipe, RecipeSummary } from '../types';

export interface RecipeListParams {
  /** Free-text search across title / summary / tags. */
  search?: string;
  /** Filter by category name. */
  category?: string;
}

/**
 * The contract every data source must satisfy. UI and query hooks depend ONLY
 * on this interface — never on a concrete implementation. To move off mock data,
 * add a new class that implements this (e.g. SupabaseRecipeRepository) and swap
 * the single binding in `./index.ts`. No screen or hook needs to change.
 */
export interface RecipeRepository {
  list(params?: RecipeListParams): Promise<RecipeSummary[]>;
  getById(id: string): Promise<Recipe | null>;
  categories(): Promise<string[]>;
}
