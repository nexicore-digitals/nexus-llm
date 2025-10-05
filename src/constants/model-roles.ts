import { ModelName, ModelRole } from '../types/models';

export const ROLE_PRIORITY_MATRIX: Record<ModelName, Partial<Record<ModelRole, number>>> = {
  'Gemini Flash 2.5': {
    prefect: 1,
    router: 2,
    summarizer: 6,
    coder: 5,
    generalist: 4,
  },
  'Gemma-3-27B-IT': {
    prefect: 7,
    router: 5,
    summarizer: 1,
    coder: 4,
    generalist: 3,
  },
  'Phi-4': {
    prefect: 6,
    router: 7,
    summarizer: 4,
    coder: 2,
    generalist: 1,
  },
  Mistral: {
    prefect: 5,
    router: 3,
    summarizer: 3,
    coder: 1,
    generalist: 2,
  },
  'DeepSeek V3': {
    prefect: 4,
    router: 1,
    summarizer: 5,
    coder: 3,
    generalist: 6,
  },
  'Llama-3.3': {
    prefect: 3,
    router: 4,
    summarizer: 2,
    coder: 6,
    generalist: 5,
  },
  'Command R+': {
    prefect: 2,
    router: 6,
    summarizer: 7,
    coder: 7,
    generalist: 7,
  },
};
