import 'dotenv/config'

import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastify from 'fastify'
import { authRoutes } from './routes/auth'
import { memoriesRoutes } from './routes/memories'

const app = fastify()

app.register(cors, {
  origin: true, // todas URLs poderão acessar o back-end
//origin: ['http://localhost:3000'] para especificar rotas
})

app.register(jwt, {
  secret: 'spacetime', //uma forma de diferenciar os jwts gerados desse backend de outros backends, pode colocar QUALQUER coisa, mas como estamos em dev pode ser só isso msm
})
app.register(authRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
  }).then(() => {
    console.log('🚀 HTTP server running oh http://localhost:3333')
  })