import { Plugin } from '../core/PluginManager';
import { LLMResponse, ReviewerOutput } from '../types/router';

export const FormatterPlugin: Plugin = {
  name: 'formatter' as any, // Internal plugin, not in public PluginName type
  postRun: async (response: LLMResponse): Promise<LLMResponse> => {
    if (typeof response.output === 'string') {
      const structuredOutput: ReviewerOutput = {
        suggestion: response.output,
      };
      return {
        ...response,
        output: structuredOutput,
      };
    }
    return response; // Output is already structured
  },
};
