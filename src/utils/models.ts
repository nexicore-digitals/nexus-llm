import { ROLE_PRIORITY_MATRIX } from '../constants/model-roles';
import { MODEL_NAME, ModelName, ModelPossibleIndex, ModelRole } from '../types/models';

const temp: { name: ModelName; role: ModelRole; rank: number }[] = [];

const intermediate: Record<ModelRole, { name: ModelName; rank: number }[]> = {
  prefect: [],
  router: [],
  summarizer: [],
  coder: [],
  generalist: [],
  multilingual: [],
  vision: [],
};

export const MODEL_REGISTRY_BY_ROLE_PRIORITY: Record<ModelRole, ModelName[]> = {
  prefect: [],
  router: [],
  summarizer: [],
  coder: [],
  generalist: [],
  multilingual: [],
  vision: [],
};

Object.keys(MODEL_NAME).forEach(key => {
  const name = MODEL_NAME[key as keyof typeof MODEL_NAME];
  const priorities = ROLE_PRIORITY_MATRIX[name];
  Object.entries(priorities).forEach(([role, rank]) => {
    temp.push({ name, role: role as ModelRole, rank });
  });
});

Object.values(temp).forEach(({ name, role, rank }) => {
  intermediate[role].push({ name, rank }); // still intermediate
});

Object.entries(intermediate).forEach(([role, entries]) => {
  MODEL_REGISTRY_BY_ROLE_PRIORITY[role as ModelRole] = entries
    .sort((a, b) => a.rank - b.rank)
    .map(entry => entry.name); // ✅ extract ModelName
});

export function getModelForRole(
  role: ModelRole,
  index: ModelPossibleIndex = 0
): ModelName | undefined {
  const models = MODEL_REGISTRY_BY_ROLE_PRIORITY[role];
  return models?.[index];
}
