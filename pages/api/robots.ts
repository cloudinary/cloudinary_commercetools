import fs from 'fs'
import {NextApiRequest, NextApiResponse} from 'next'

// @ts-ignore
const Robots = async (req: NextApiRequest, res: NextApiResponse) => {
  const robotsPath = `./public/robots-${process.env.APP_ENV}.txt`
  fs.readFile(robotsPath, 'utf8', (err, data) => {
    if (err) throw err
    res.send(data)
    res.end()
  })
}

export default Robots
