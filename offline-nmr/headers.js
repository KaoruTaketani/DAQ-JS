import { readdirSync, readFileSync } from 'fs'
import { basename, join } from 'path'
import { hostname } from 'os'

const nmrPath = '../../sigb/2015/1203/'

readdirSync(nmrPath).forEach(fileName => {
  console.log(fileName)
  // followings are not seems to have headers
  // so skip
  // except 221113.sigb, all file size are 2004000+1024 bytes
  // so may be just failed to write the header
  if (fileName === '155033.sigb') return
  if (fileName === '155137.sigb') return
  if (fileName === '155905.sigb') return
  if (fileName === '161359.sigb') return
  if (fileName === '163000.sigb') return
  if (fileName === '163624.sigb') return
  if (fileName === '165952.sigb') return
  if (fileName === '171656.sigb') return
  if (fileName === '172321.sigb') return
  if (fileName === '172530.sigb') return
  if (fileName === '172841.sigb') return
  if (fileName === '173820.sigb') return
  if (fileName === '175630.sigb') return
  if (fileName === '182214.sigb') return
  if (fileName === '182318.sigb') return
  if (fileName === '182632.sigb') return
  if (fileName === '182945.sigb') return
  if (fileName === '183050.sigb') return
  if (fileName === '183156.sigb') return
  if (fileName === '183300.sigb') return
  if (fileName === '183404.sigb') return
  if (fileName === '183508.sigb') return
  if (fileName === '184344.sigb') return
  if (fileName === '184449.sigb') return
  if (fileName === '185116.sigb') return
  if (fileName === '190615.sigb') return
  if (fileName === '190824.sigb') return
  if (fileName === '191553.sigb') return
  if (fileName === '191657.sigb') return
  if (fileName === '193046.sigb') return
  if (fileName === '193150.sigb') return
  if (fileName === '193253.sigb') return
  if (fileName === '195103.sigb') return
  if (fileName === '195416.sigb') return
  if (fileName === '195835.sigb') return
  if (fileName === '200606.sigb') return
  if (fileName === '202106.sigb') return
  if (fileName === '202315.sigb') return
  if (fileName === '202524.sigb') return
  if (fileName === '205208.sigb') return
  if (fileName === '205312.sigb') return
  if (fileName === '205416.sigb') return
  if (fileName === '205520.sigb') return
  if (fileName === '205623.sigb') return
  if (fileName === '210040.sigb') return
  if (fileName === '211331.sigb') return
  if (fileName === '213806.sigb') return
  if (fileName === '214118.sigb') return
  if (fileName === '214743.sigb') return
  if (fileName === '215617.sigb') return
  if (fileName === '215930.sigb') return
  // if (fileName === '220347.sigb') return

  const buffer = readFileSync(join(nmrPath, fileName)),
    header = new TextDecoder().decode(new Uint8Array(buffer.buffer, 0, 1024))//.split('\n').
  console.log(header)
})
