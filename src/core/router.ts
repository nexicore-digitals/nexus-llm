export interface LLMRouter {
  route(input: string, context?: RouterContext): Promise<LLMResponse>;
}

export interface RouterContext {
  model?: string;
  plugin?: string;
  metadata?: Record<string, any>;
}

export interface LLMResponse {
  output: string;
  tokensUsed?: number;
  pluginUsed?: string;
}
