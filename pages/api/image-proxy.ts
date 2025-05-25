// pages/api/image-proxy.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import Sharp from 'sharp'
import fetch from 'node-fetch'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { url, w, format } = req.query as { url: string, w?: string, format?: string }

    if (!url) return res.status(400).send('Missing URL')

    try {
        const response = await fetch(url)
        if (!response.ok) return res.status(404).send('Image not found')

        const buffer = await response.buffer()
        const width = w ? parseInt(w, 10) : 800
        const fmt = format === 'avif' ? 'avif' : 'webp'

        const output = await Sharp(buffer)
            .resize(width)
            .toFormat(fmt, { quality: 75 })
            .toBuffer()

        res.setHeader('Content-Type', `image/${fmt}`)
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        res.status(200).send(output)
    } catch (err) {
        res.status(500).send('Image processing error')
    }
}
