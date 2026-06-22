import { useQuery } from '@tanstack/react-query';

import { recipeRepository, type RecipeListParams } from '../data';
import { recipeKeys } from './recipe.keys';

/**
 * Data-access hooks. Components consume these — they never touch the repository
 * directly, so caching, loading, and error handling live in one place.
 */

export function useRecipes(params: RecipeListParams = {}) {
  return useQuery({
    queryKey: recipeKeys.list(params),
    queryFn: () => recipeRepository.list(params),
  });
}

export function useRecipe(id: string) {
  return useQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: () => recipeRepository.getById(id),
    enabled: Boolean(id),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: recipeKeys.categories(),
    queryFn: () => recipeRepository.categories(),
    staleTime: Infinity, // categories rarely change
  });
}
