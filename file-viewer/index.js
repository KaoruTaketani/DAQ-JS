import express from 'express'
import RootRouter from './RootRouter.js';
import AttributesRouter from './AttributesRouter.js'
import FilesRouter from './FilesRouter.js'

const app = express()

app.use('/', RootRouter)
app.use('/', AttributesRouter)
app.use('/', FilesRouter)
app.use(express.static('./'))

process.env.hdf5Path = '../../hdf5'

app.listen(80, () => {
  console.log('Server is running on http://localhost')
})