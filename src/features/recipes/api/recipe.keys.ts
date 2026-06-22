import type { RecipeListParams } from '../data';

/**
 * Centralized query-key factory. Keeping keys in one hierarchy makes targeted
 * cache invalidation trivial, e.g. `queryClient.invalidateQueries({ queryKey: recipeKeys.lists() })`.
 */
export const recipeKeys = {
  all: ['recipes'] as const,
  lists: () => [...recipeKeys.all, 'list'] as const,
  list: (params: RecipeListParams) => [...recipeKeys.lists(), params] as const,
  details: () => [...recipeKeys.all, 'detail'] as const,
  detail: (id: string) => [...recipeKeys.details(), id] as const,
  categories: () => [...recipeKeys.all, 'categories'] as const,
};
