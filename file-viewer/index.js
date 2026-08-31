import express from 'express'
import RootRouter from './RootRouter.js';
import AttributesRouter from './AttributesRouter.js'
import FilesRouter from './FilesRouter.js'
import TableRouter from './TableRouter.js'
import NumEventsRouter from './NumEventsRouter.js'
import NumWaveformsRouter from './NumWaveformsRouter.js'
import XYRouter from './XYRouter.js'
import WaveformRouter from './WaveformRouter.js'
import ImageRouter from './ImageRouter.js'
import ObjectsRouter from './ObjectsRouter.js'
import HTMLXRouter from './HTMLXRouter.js'
import HeadersRouter from './HeadersRouter.js'
import WaveformArrayRouter from './WaveformArrayRouter.js'

const app = express()

app.use('/', RootRouter)
app.use('/', AttributesRouter)
app.use('/', FilesRouter)
app.use('/', TableRouter)
app.use('/', NumEventsRouter)
app.use('/', NumWaveformsRouter)
app.use('/', WaveformRouter)
app.use('/', WaveformArrayRouter)
app.use('/', XYRouter)
app.use('/', ImageRouter)
app.use('/', ObjectsRouter)
app.use('/', HeadersRouter)
app.use('/', HTMLXRouter)
app.use('/lib', express.static('../lib'))
app.use(express.static('./'))

process.env.hdf5Path = '../../hdf5'
process.env.edrPath = '../../edr'
process.env.jsonPath = '../../../../Library/CloudStorage/Dropbox/JSON/'
process.env.sigbPath = '../../sigb'

app.listen(80, () => {
  console.log('Server is running on http://localhost')
})