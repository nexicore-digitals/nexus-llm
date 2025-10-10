// src/types/llm-config.ts

export interface AttentionConfig {
  headCount: number;
  headCountKV: number;
  layerNormRMSEpsilon: number;
  layerNormEpsilon: number;
}

export interface TokenizerInfo {
  model: string;
  tokens: string[];
  tokenType: number[];
  merges?: string[];
  bosTokenId: number;
  eosTokenId: number;
  unknownTokenId: number;
  chatTemplate: string;
}

export interface LLMDetails {
  blockCount?: number;
  contextLength?: number;
  embeddingLength?: number;
  feedForwardLength?: number;
  attention?: AttentionConfig;
  tensor: {
    name: string; // the single tensor
    shape: [number, number];
    precision: string;
  };
  ropeFreqBase?: number;
  [key: string]: any; // generic for other architectures
}

export interface LLMConfig {
  name: string;
  family: string;
  developer: string;
  version: string;
  params: string; // like "7B", "15B", etc.
  fileType: string; // GGUF, Q4_K_M, etc.
  tensorCount: 1;
  kvCount: number;
  architecture: string; // e.g., "starcoder2"
  quantizationVersion: number;
  details: LLMDetails;
  tokenizer: TokenizerInfo;
}
