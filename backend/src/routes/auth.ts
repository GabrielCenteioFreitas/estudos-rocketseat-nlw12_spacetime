import axios from 'axios';
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from '../lib/prisma';

export async function authRoutes(app: FastifyInstance){ 
  app.post('/register', async (request) => {
    const bodySchema = z.object({
      code: z.string()
    })

    const { code } = bodySchema.parse(request.body)

    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      null, //body
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json'
        }
      } //config
    )

    const { access_token } = accessTokenResponse.data

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })

    const userInfo = userSchema.parse(userResponse.data)

    let user = await prisma.user.findUnique({
      where: {
        githubId: userInfo.id
      }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: userInfo.id,
          login: userInfo.login,
          name: userInfo.name,
          avatarUrl: userInfo.avatar_url
        }
      })
    }

    const token = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      }, // no primeiro {} os dados q queremos q sejam públicos
      {
        sub: user.id, // sub vem de subject e é o que identifica o usuário, no caso o id
        expiresIn: '30 days', // em quanto tempo o token vai expirar
      },
    )

    return {
      token
    }
  })
}