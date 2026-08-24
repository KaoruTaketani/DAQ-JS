import express from 'express'
import RootRouter from './RootRouter.js';

const app = express()

app.use('/', RootRouter)

app.listen(80, () => {
  console.log('Server is running on http://localhost')
})