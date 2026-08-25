import express from 'express'
import RootRouter from './RootRouter.js';
import AttributesRouter from './AttributesRouter.js'
import FilesRouter from './FilesRouter.js'
import TableRouter from './TableRouter.js'
import NumEventsRouter from './NumEventsRouter.js'
import XYRouter from './XYRouter.js'
import LibRouter from './LibRouter.js'

const app = express()

app.use('/', RootRouter)
app.use('/', AttributesRouter)
app.use('/', FilesRouter)
app.use('/', TableRouter)
app.use('/', NumEventsRouter)
app.use('/', XYRouter)
app.use('/lib',LibRouter)
app.use(express.static('./'))

process.env.hdf5Path = '../../hdf5'
process.env.edrPath = '../../edr'

app.listen(80, () => {
  console.log('Server is running on http://localhost')
})