import app from '~/app'
import env from '~/config/env'

const port = env.SERVER_PORT || 5000

const server = app.listen(port, () => {
  console.log(`🚀 Server is running at http://${env.SERVER_HOST}:${env.SERVER_PORT}`)
})

process.on('SIGINT', () => server.close(() => console.log(`❌ Server is closed`)))
