import TCPInitializer from './TCPInitializer.js'
import { Socket } from 'net'
import Variables from './Variables.js'

const variables = new Variables()

new TCPInitializer(variables)

variables.tcpQueue.assign([])
variables.tcpSocket.assign(new Socket())
variables.channel1Pulse.sync()
// variables.channel2Pulse.sync()

