import { CodegenConfig } from '@graphql-codegen/cli';
import { PRODUCTION } from './src/consts';

const config: CodegenConfig = {
  schema: process.env.MODE === PRODUCTION ? 'http://92.255.79.9:5050/query' : 'http://0.0.0.0:5050/query',
  documents: ['src/**/*.tsx'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;