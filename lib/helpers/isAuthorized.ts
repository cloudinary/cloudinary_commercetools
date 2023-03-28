import {NextApiRequest} from 'next'

export const isAuthorized = (req: NextApiRequest): boolean => {
  const apiKey = req.query.key as string
  return apiKey === process.env.CACHE_APIKEY
}
