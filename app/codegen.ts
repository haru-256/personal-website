import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      'https://graphql.contentful.com/content/v1/spaces/jq5grt81hit3/environments/master':
        {
          headers: {
            Authorization: `Bearer ${process.env.CONTENTFUL_TOKEN}`,
          },
        },
    },
  ],
  documents: ['./src/graphql/**/*.graphql'],
  generates: {
    './src/graphql/generated/': {
      preset: 'client',
      plugins: [],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

export default config
