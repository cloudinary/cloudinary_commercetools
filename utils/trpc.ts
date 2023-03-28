import {httpBatchLink} from '@trpc/client'
import {createTRPCNext} from '@trpc/next'
import type {AppRouter} from '../server/routers/_app'

function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return ''

  if (process.env.NEXT_PUBLIC_EXTERNAL_DATA_URL)
    // reference for externally hosted URL
    return process.env.NEXT_PUBLIC_EXTERNAL_DATA_URL

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpc = createTRPCNext<AppRouter>({
  config({ctx}) {
    console.log(getBaseUrl())
    return {
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      /**
       * @link https://tanstack.com/query/v4/docs/reference/QueryClient
       **/
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,
})
