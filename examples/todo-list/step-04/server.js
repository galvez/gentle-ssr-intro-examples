import Fastify from 'fastify'
import FastifyVite from 'fastify-vite'
import FastifyViteVue from 'fastify-vite-vue'

const app = Fastify({ logger: true })

app.decorate('todoList', [
  'Do laundry',
  'Respond to emails',
  'Write report'
])

await app.register(FastifyVite, {
  renderer: FastifyViteVue,
  root: import.meta.url,
})

await app.vite.ready()

app.post('/add', (req, reply) => {
  app.todoList.push(req.body.item)
  reply.send(0)
})

await app.vite.commands()

await app.listen(3000)
