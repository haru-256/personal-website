/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query BlogPostIDs($limit: Int, $page: Int) {\n  blogPostCollection(limit: $limit, skip: $page) {\n    blogs: items {\n      slug\n    }\n  }\n}\n\nquery BlogPostCards($slugs: [String!]!) {\n  blogPostCollection(where: {slug_in: $slugs}) {\n    blogs: items {\n      slug\n      title\n      publishDate\n      description\n      tagCollection {\n        tags: items {\n          slug\n          name\n        }\n      }\n    }\n  }\n}\n\nquery BlogPost($slug: String!) {\n  blogPostCollection(where: {slug: $slug}) {\n    blogs: items {\n      title\n      publishDate\n      description\n      body\n      tagCollection {\n        tags: items {\n          slug\n          name\n        }\n      }\n    }\n  }\n}": typeof types.BlogPostIDsDocument,
};
const documents: Documents = {
    "query BlogPostIDs($limit: Int, $page: Int) {\n  blogPostCollection(limit: $limit, skip: $page) {\n    blogs: items {\n      slug\n    }\n  }\n}\n\nquery BlogPostCards($slugs: [String!]!) {\n  blogPostCollection(where: {slug_in: $slugs}) {\n    blogs: items {\n      slug\n      title\n      publishDate\n      description\n      tagCollection {\n        tags: items {\n          slug\n          name\n        }\n      }\n    }\n  }\n}\n\nquery BlogPost($slug: String!) {\n  blogPostCollection(where: {slug: $slug}) {\n    blogs: items {\n      title\n      publishDate\n      description\n      body\n      tagCollection {\n        tags: items {\n          slug\n          name\n        }\n      }\n    }\n  }\n}": types.BlogPostIDsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query BlogPostIDs($limit: Int, $page: Int) {\n  blogPostCollection(limit: $limit, skip: $page) {\n    blogs: items {\n      slug\n    }\n  }\n}\n\nquery BlogPostCards($slugs: [String!]!) {\n  blogPostCollection(where: {slug_in: $slugs}) {\n    blogs: items {\n      slug\n      title\n      publishDate\n      description\n      tagCollection {\n        tags: items {\n          slug\n          name\n        }\n      }\n    }\n  }\n}\n\nquery BlogPost($slug: String!) {\n  blogPostCollection(where: {slug: $slug}) {\n    blogs: items {\n      title\n      publishDate\n      description\n      body\n      tagCollection {\n        tags: items {\n          slug\n          name\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query BlogPostIDs($limit: Int, $page: Int) {\n  blogPostCollection(limit: $limit, skip: $page) {\n    blogs: items {\n      slug\n    }\n  }\n}\n\nquery BlogPostCards($slugs: [String!]!) {\n  blogPostCollection(where: {slug_in: $slugs}) {\n    blogs: items {\n      slug\n      title\n      publishDate\n      description\n      tagCollection {\n        tags: items {\n          slug\n          name\n        }\n      }\n    }\n  }\n}\n\nquery BlogPost($slug: String!) {\n  blogPostCollection(where: {slug: $slug}) {\n    blogs: items {\n      title\n      publishDate\n      description\n      body\n      tagCollection {\n        tags: items {\n          slug\n          name\n        }\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;