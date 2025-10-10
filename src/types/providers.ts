import { ModelName, UseCase } from './models/models';

export interface ModelInvocationPayload {
  task?: UseCase;
  context?: string; // optional long-form or plugin context
  metadata?: {
    model?: string;
    plugin?: string;
    source?: string;
    userIntent?: string;
    fallbackTier?: number;
  };
}

export type ModelInvocationHandler = (
  input: string,
  payload?: ModelInvocationPayload
) => Promise<{ model: ModelName; response: string }>;
