#headless-cms #cms 

## Headless CMSのランキング

```embed
title: 'Jamstack Community Survey Results 2022 | Jamstack'
image: 'https://www.jamstack.org/img/og/jamstack-community-survey-2022-og.png'
description: 'The third annual Jamstack Survey conducted by Netlify reveals developer attitudes towards trends like remote work, Web3, serverless, edge and more.'
url: 'https://jamstack.org/survey/2022/#content-management-systems'
```

```embed
title: 'G2 leader'
image: 'https://www.g2.com/favicon.ico'
description: 'www.g2.com needs to review the security of your connection before proceeding.'
url: 'https://www.g2.com/categories/headless-cms'
```


## [Strapi](https://strapi.io/)

### Free plan
- API Requests (per month): Unlimited
  - content lakeへのリアルタイム同期によるリクエストも含まれる。案外早くこの条件を満たしてしまいそう。1記事あたり300程度のリクエストはしそう
- Assets: Unlimited
  - 少ない
- Bandwidth (per month): Unlimited
- Documents (= Articles): Unlimited
- Useable API
  - GraphQL
  - HTTP API

### 概要
完全に自分でhostするHeadless CMS. strapiは TypeScript  (or JavaScript) + Node.js + SQLite (or PostgreSQL or MySQL etc)  で作成されている。Headless CMS自体はすぐにhostできる。しかし、infraの管理も必要となる。

Google Cloudでhostする場合は以下の構成になる見込み
- Cloud Run with IAP：IAPでアクセスを制限する。strapiにもアクセス制限を設けることができるが、自身でhostするため広く提供するとリスクが高い。そのためIAPを用いる。
- Cloud SQL
  - private ip or public ip
  - praivate ip の場合：Cloud RunとCloud SQLを接続するために、1. Cloud Runを自身のVPC（Google Cloud）につなげる 2. Cloud SQLを自身のVPCにつなげる, の2stepが必要
    - Cloud Runを自身のVPCにつなげる: Cloud RunはGoogleで管理されているため、自身のVPC内からアクセスできない。そのため、Cloud RunをServerless VPC Connector を持ちて、VPCをつなげる。
    - Cloud SQLを自身のVPCにつなげる: Cloud SQLもGoogleで管理しているため、自身のVPC内からアクセスできない。この場合はVPC peeringを用いて自身のVPCをつなげる。
  - public ipの場合：Cloud RunとCloud SQLはinternetを通してつなげる。この場合通信を暗号化するためTLSが必要。しかし、GoogleはCloud SQL Auth Proxyを提供しているため、これを使用することでTLSを自身で作成する手間が省ける


### 機能
- [Strapi Cloud](https://strapi.io/cloud): comming soon. cloudで管理されるCMS。課金形式だと思われるが、値段はわからない（[参照](https://strapi.io/pricing-cloud)）。

## [Sanity](https://www.sanity.io/)

### Free plan
https://www.sanity.io/pricing

- API Requests (per month): 100k 
  - content lakeへのリアルタイム同期によるリクエストも含まれる。案外早くこの条件を満たしてしまいそう。1記事あたり300程度のリクエストはしそう
- Assets: 5GB
  - ちょっと心もとない、、、
- Bandwidth (per month): 10GB
- Documents (= dataset内に属するcontent): 10k
- Useable API
  - [GraphQL]( https://www.sanity.io/docs/graphql): 使えはするが、公式的には独自クエリ言語GROQを押している。また、Mutationは対応していない（個人ブログではまずフロントからmutationを使わないので大丈夫そう。その代わりにCMSのSanity Statdioを使用するが、リクエスト制限がある）。
  - [HTTP API](https://www.sanity.io/docs/http-api)
  - [GROQ](https://www.sanity.io/docs/groq-reference)
  

### 概要

### 機能
- **Sanity Stadio**：Content Management System, document（記事のこと）を作成するためのツール。Typescript + React + viteのSPAで作成されており、はじめはシンプルな構成となっている。Sanity Stadioコンテンツ制作のためのリアルタイムコラボレーションアプリケーション。どこでhostしていても（ローカルでも）ネットを通じてContent Lakeに接続し、リアルタイムで記事の保存を行う。Sanity Studioには、編集体験をカスタマイズするためのフレームワークも付属している。JavaScriptによるカスタムフォーム検証の定義から、Reactによる入力コンポーネントの構築など、あらゆることを行うことが可能とのこと。
- **Content Lake**：Sanity Content Lakeは、コンテンツが保存され、アクセスされる場所。クラウドで動作しており、Sanityによる fully managed。Sanity client-libraryかHTTP APIを用いて、定義されたSanity APIを介してContent Lakeにアクセスする
- **GROQ**：open-sourceのquery-language。機能はGraphQLにており、複数リソースタイプを結合して、必要なfieldのみを取得できる。書き方もGraphQLに似ている。

## [Contentful](https://www.contentful.com/)

### Free plan
-  API Requests (per month): 2,000,000
  - content lakeへのリアルタイム同期によるリクエストも含まれる。案外早くこの条件を満たしてしまいそう。1記事あたり300程度のリクエストはしそう
- Assets: 25k
	- ※ ただし、Documents + Assets で25kいない
- Bandwidth (per month): 
	- Asset bandwidth: .75 TB
	- API calls: 2,000,000
- Documents (= dataset内に属するcontent): 25k
	- ※ ただし、Documents + Assets で25kいない
- Contet Type (= 入力欄の数): 48
- Useable API
  - [GraphQL]( https://www.sanity.io/docs/graphql)
  - [HTTP API](https://www.sanity.io/docs/http-api)

### 概要

### 機能



