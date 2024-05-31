import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'

const app = fastify()

app.register(cors, {
  origin: true, // todas URLs poderão acessar o back-end
//origin: ['http://localhost:3000'] para especificar rotas
})
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
  }).then(() => {
    console.log('🚀 HTTP server running oh http://localhost:3333')
  })