import { ModelMetadata, UseCase } from '../types/models';
import { MODEL_REGISTRY } from './models';

export const MODEL_REGISTRY_BY_USE_CASE: Record<string, ModelMetadata[]> = {};

MODEL_REGISTRY.forEach(model => {
  model.useCases.forEach(useCase => {
    if (!MODEL_REGISTRY_BY_USE_CASE[useCase]) {
      MODEL_REGISTRY_BY_USE_CASE[useCase] = [];
    }
    MODEL_REGISTRY_BY_USE_CASE[useCase].push(model);
  });
});

export function getModelForUseCase(useCase: UseCase) {
  return MODEL_REGISTRY_BY_USE_CASE[useCase];
}
