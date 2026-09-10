import express from 'express';
import { BlockList } from 'net'
import AttributesRouter from './AttributesRouter.js';
import FilesRouter from './FilesRouter.js';
import HtmlRouter from './HtmlRouter.js';
import HeadersRouter from './HeadersRouter.js';
import ImageRouter from './ImageRouter.js';
import KeysRouter from './KeysRouter.js';
import NumEventsRouter from './NumEventsRouter.js';
import NumWaveformsRouter from './NumWaveformsRouter.js';
import RootRouter from './RootRouter.js';
import TableRouter from './TableRouter.js';
import WaveformRouter from './WaveformRouter.js';
import HistogramRouter from './HistogramRouter.js';
import XYRouter from './XYRouter.js';

const app = express()
const blockList = new BlockList()
blockList.addRange('0.0.0.0', '255.255.255.255')

app.use('/', (req, res, next) => {
  const clientIp = req.ip

  if (!clientIp) {
    res.sendStatus(403)
  } else {
    if (blockList.check(clientIp) || blockList.check(clientIp, 'ipv6')) {
      res.sendStatus(403)
    } else {
      next()
    }
  }
})

app.use('/', RootRouter)
app.use('/', AttributesRouter)
app.use('/', FilesRouter)
app.use('/', KeysRouter)
app.use('/', TableRouter)
app.use('/', NumEventsRouter)
app.use('/', NumWaveformsRouter)
app.use('/', HistogramRouter)
app.use('/', WaveformRouter)
app.use('/', XYRouter)
app.use('/', ImageRouter)
app.use('/', HeadersRouter)
app.use('/', HtmlRouter)
app.use('/lib', express.static('../lib'))
app.use(express.static('./'))

process.env.hdf5Path = '../../hdf5'
process.env.edrPath = '../../edr'
process.env.jsonPath = '../../../../Library/CloudStorage/Dropbox/JSON/'
process.env.sigbPath = '../../sigb'

app.listen(80, () => {
  console.log('Server is running on http://localhost')
})