import { LLMConfig } from '../../types/llm-config';

export const STARCODER2_CONFIG: LLMConfig = {
  name: 'starcoder2-hf',
  family: 'BigCode',
  developer: 'BigCode',
  version: '3',
  params: '15B',
  fileType: 'Q4_K_M',
  tensorCount: 1,
  kvCount: 20,
  architecture: 'starcoder2',
  quantizationVersion: 2,
  details: {
    blockCount: 40,
    contextLength: 16384,
    embeddingLength: 6144,
    feedForwardLength: 24576,
    attention: {
      headCount: 48,
      headCountKV: 4,
      layerNormRMSEpsilon: 0.000009999999747378752,
      layerNormEpsilon: 0.000009999999747378752,
    },
    ropeFreqBase: 100000,
    tensor: {
      name: 'token_embd.weight', // the single tensor
      shape: [6144, 49152],
      precision: 'Q4_K',
    },
  },
  tokenizer: {
    model: 'gpt2',
    tokens: ['<|endoftext|>', '<fim_prefix>', '<fim_middle>', '<fim_suffix>', '<fim_pad>'],
    tokenType: [3, 3, 3, 3, 3],
    merges: ['Ġ Ġ', 'ĠĠ ĠĠ', 'ĠĠĠĠ ĠĠĠĠ'],
    bosTokenId: 0,
    eosTokenId: 0,
    unknownTokenId: 0,
  },
};
