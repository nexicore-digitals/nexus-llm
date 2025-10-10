import { ModelRole } from './models/model-roles';
import { UseCase } from './models/model-usecase';
import { ModelName } from './models/models';

export interface LLMRouter {
  route(input: string, context?: RouterContext): Promise<LLMResponse>;
}

export interface RouterContext {
  useCase?: UseCase;
  model?: ModelName;
  role?: ModelRole;
  plugin?: string;
  metadata?: Record<string, any>;
}

export interface LLMResponse {
  output: string;
  model: ModelName;
  tokensUsed?: number;
  pluginUsed?: string;
  error?: string;
}
