import { ROLE_PRIORITY_MATRIX } from '../constants/model-roles';
import { getModelForUseCase } from '../constants/model-usecase';
import { ModelRole } from '../types/models/model-roles';
import { UseCase } from '../types/models/model-usecase';
import { ModelName, ModelPossibleIndex } from '../types/models/models';

/**
 * A pre-computed, priority-sorted registry of models for each role.
 * This is generated once at startup for efficient lookups.
 */
export const MODEL_REGISTRY_BY_ROLE_PRIORITY = ((): Record<ModelRole, ModelName[]> => {
  const registry: Partial<Record<ModelRole, { name: ModelName; rank: number }[]>> = {};

  // Group models by role from the priority matrix
  for (const modelName in ROLE_PRIORITY_MATRIX) {
    const roles = ROLE_PRIORITY_MATRIX[modelName as ModelName];
    for (const role in roles) {
      const modelRole = role as ModelRole;
      if (!registry[modelRole]) {
        registry[modelRole] = [];
      }
      registry[modelRole]!.push({ name: modelName as ModelName, rank: roles[modelRole]! });
    }
  }

  // Sort each role's model list by rank and extract just the names
  const finalRegistry: Partial<Record<ModelRole, ModelName[]>> = {};
  for (const role in registry) {
    finalRegistry[role as ModelRole] = registry[role as ModelRole]!.sort(
      (a, b) => a.rank - b.rank
    ).map(m => m.name);
  }

  return finalRegistry as Record<ModelRole, ModelName[]>;
})();

export function getModelForRole(
  role: ModelRole,
  index: ModelPossibleIndex = 0
): ModelName | undefined {
  const models = MODEL_REGISTRY_BY_ROLE_PRIORITY[role];
  return models?.[index];
}

export function resolveModelByRoleAndUseCase(
  role: ModelRole,
  useCase: UseCase,
  index: ModelPossibleIndex = 0
): ModelName {
  const roleModels = MODEL_REGISTRY_BY_ROLE_PRIORITY[role];
  if (!roleModels) {
    throw new Error(`No models found for role: ${role}`);
  }

  const useCaseModels = getModelForUseCase(useCase).map(m => m.name);
  const useCaseModelSet = new Set(useCaseModels);

  const bestFit = roleModels.find(model => useCaseModelSet.has(model));

  return bestFit ?? roleModels[index]; // Fallback to the indexed role model if no intersection
}
