import { exec } from 'child_process'
import IndexOperators from './IndexOperators.js'
import IndexVariables from './IndexVariables.js'
import MainOperators from './MainOperators.js'
import MainVariables from './MainVariables.js'
import init from './init.js'

const index = {}
const mainVariables = new MainVariables()
index._mainOperators = new MainOperators(mainVariables)
index.variables = new IndexVariables(mainVariables)
index._operators = new IndexOperators(index.variables)
index.variables.httpServerPort.assign(80)
init(mainVariables)

if (process.platform === 'win32') {
    // const commands = ['get-service']
    //
    // status of windows update can be obtained by follwing code
    // if IsPresent is false, the task seems to be ignorable
    //
    //                                                       | IsInstalled | IsDownloaded | RebootRequired | IsPresent
    // get noticed but not downloaded                        | false       | false        | false          | false
    // downloaded adn installing or wainging for the install | false       | true         | false          | false
    // rebooting is necessary to complete the install        | false       | true         | true           | false
    // rebooting is necessary after install                  | true        | true         | true           | false
    // installed                                             | true        | true         | false          | false
    //
    // reference:
    //  https://ascii.jp/elem/000/004/072/4072221/
    // 
    const commands = [
        'chcp 65001',
        '$searcher = (New-Object -ComObject Microsoft.Update.Session).CreateUpdateSearcher()',
        '$updates = $searcher.search("IsInstalled=0 OR IsInstalled=1").updates',
        '$updates | select title,isInstalled,IsDownloaded,RebootRequired,IsPresent | convertTo-json'
    ]
    exec(commands.join('\n'), { shell: 'powershell.exe' }, (error, stdout, stderr) => {
        if (error) throw error

        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
    })
}
