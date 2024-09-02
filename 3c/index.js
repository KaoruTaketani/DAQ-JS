import { Server } from 'http'
import ListenableString from './ListenableString.js'
import ListenableObject from './ListenableObject.js'
import HTTPResponseMaker from './HTTPResponseMaker.js'

const httpRequestUrl = new ListenableString()
const httpResponse = new ListenableObject()

new HTTPResponseMaker(httpResponse, httpRequestUrl)

const httpServer = new Server()

httpServer.on('request', (request, response) => {
    httpResponse.assign(response)
    httpRequestUrl.assign(request.url)
})
httpServer.listen(80)
