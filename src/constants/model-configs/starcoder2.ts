import { LLMConfig } from '../../types/llm-config';

export const starcoder2: LLMConfig = {
  name: 'starcoder2',
  family: 'StarCoder2',
  developer: 'Hugging Face & BigCode',
  version: '3',
  params: '15B',
  fileType: 'Q4_K_M',
  tensorCount: 1,
  kvCount: 24,
  architecture: 'starcoder2',
  quantizationVersion: 2,

  details: {
    blockCount: 40,
    contextLength: 16384,
    embeddingLength: 6144,
    feedForwardLength: 24576,
    ropeFreqBase: 100000,
    attention: {
      headCount: 48,
      headCountKV: 4,
      layerNormRMSEpsilon: 0, // not specified in data
      layerNormEpsilon: 0.000009999999747378752,
    },
    tensor: {
      name: 'starcoder2-15b-instruct-v0.1.imatrix',
      shape: [240, 107], // derived from entries_count × chunks_count
      precision: 'Q4_K_M',
    },
    quantization: {
      imatrix: {
        file: '/models/starcoder2-15b-instruct-v0.1-GGUF/starcoder2-15b-instruct-v0.1.imatrix',
        dataset: '/training_data/groups_merged.txt',
        entriesCount: 240,
        chunksCount: 107,
      },
    },
  },

  tokenizer: {
    model: 'gpt2',
    tokens: [
      '<|endoftext|>',
      '<fim_prefix>',
      '<fim_middle>',
      '<fim_suffix>',
      '<fim_pad>',
      // ... truncated for brevity
    ],
    tokenType: [3, 3, 3, 3, 3 /* ... */],
    merges: [
      'Ġ Ġ',
      'ĠĠ ĠĠ',
      'ĠĠĠĠ ĠĠĠĠ',
      'ĠĠ Ġ',
      'e r',
      // ... truncated for brevity
    ],
    bosTokenId: 0,
    eosTokenId: 0,
    unknownTokenId: 0,
    chatTemplate:
      "{{bos_token}}{{'You are an exceptionally intelligent coding assistant that consistently delivers accurate and reliable responses to user instructions. '}} {%- for message in messages %} {%- if message['role'] == 'system' %} {{ raise_exception('System messages are not allowed in this template.') }} {%- else %} {%- if message['role'] == 'user' %} {{'### Instruction ' + message['content'] + ' '}} {%- else %} {{'### Response ' + message['content'] + eos_token + ' '}} {%- endif %} {%- endif %} {%- endfor %} {{'### Response '}}",
  },
};
