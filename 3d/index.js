import { Server } from 'http'
import HTTPResponseMaker from './HTTPResponseMaker.js'
import Variables from './Variables.js'

const variables = new Variables()

new HTTPResponseMaker(variables)

const httpServer = new Server()

httpServer.on('request', (request, response) => {
    variables.httpResponse.assign(response)
    variables.httpRequestUrl.assign(request.url)
})
httpServer.listen(80)
