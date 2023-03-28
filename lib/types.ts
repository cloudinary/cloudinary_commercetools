import {ParsedUrlQuery} from 'querystring'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CLOUDINARY_CLOUDNAME: string
      
      COMMERCETOOLS_AUTHURL: string
      COMMERCETOOLS_CLIENTID: string
      COMMERCETOOLS_CLIENTSECRET: string

      COMMERCETOOLS_APIURL: string
      COMMERCETOOLS_PROJECTKEY: string
    }
  }
}

export type Mapping = {
  slug: string
  id: string
  prerender?: boolean
}

export interface Params extends ParsedUrlQuery {
  slug: string[]
}

export type PageProps = {
  //mappings: Mapping[]
  //translatedPagePaths: {[locale: string]: string}
  params: Params
  preview: boolean
  content: any
  //id: string
}

export type LandingPageProps = PageProps

export type AssetInfo = {
  input: {
    width: number
    height: number
    bytes: number
  }
  output: {
    format: string
    width: number
    height: number
    bytes: number
  }
  updates: number
}

export type CtPrice = { 
  centAmount: number
  currencyCode: string
}

export type CtAsset = {
  id: string
  sources: {
    uri: string
    contentType: string
  }[]
  name: {
    'en-US': string
  }
  tags: string[]
}