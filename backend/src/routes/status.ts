import { FastifyInstance } from "fastify";

export async function statusRoutes(app: FastifyInstance) {
  app.get('/status', () => {
    return {
      ok: true
    }
  })
}