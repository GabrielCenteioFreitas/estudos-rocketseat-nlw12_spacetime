import 'dotenv/config'

import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import fastify from 'fastify'
import { resolve } from "path"
import { authRoutes } from './routes/auth'
import { memoriesRoutes } from './routes/memories'
import { uploadRoutes } from './routes/upload'
import { statusRoutes } from './routes/status'

const app = fastify()

app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads'
})

app.register(cors, {
  origin: true, // todas URLs poderão acessar o back-end
//origin: ['http://localhost:3000'] para especificar rotas
})

app.register(jwt, {
  secret: 'spacetime', //uma forma de diferenciar os jwts gerados desse backend de outros backends, pode colocar QUALQUER coisa, mas como estamos em dev pode ser só isso msm
})
app.register(statusRoutes)
app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
    host: '0.0.0.0', // pra funcionar no mobile
  }).then(() => {
    console.log('🚀 HTTP server running oh http://localhost:3333')
  })