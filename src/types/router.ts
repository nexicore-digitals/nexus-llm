import { ModelRole } from './models/model-roles';
import { UseCase } from './models/model-usecase';
import { ModelName } from './models/models';
import { Contributor } from './contributor';

export interface LLMRouter {
  route(input: string, context?: RouterContext): Promise<LLMResponse>;
}

export interface RouterContext {
  useCase?: UseCase;
  model?: ModelName;
  role?: ModelRole;
  plugins?: string[];
  contributor?: Contributor;
  metadata?: Record<string, any>;
}

export interface LLMResponse {
  output: string;
  model: ModelName;
  tokensUsed?: number;
  pluginsUsed?: string[];
  error?: string;
}
