const chalk = require('chalk')
 

function LoggingService() {



    const createSpace = (spaceCount) => '\n'.repeat(spaceCount)
    const createTab = (spaceCount) => '\t'.repeat(spaceCount)



    const Log = (msg, color, bgColor, spaceCount = 0, tabCount = 0) => {
        let s = createSpace(spaceCount)
        let t = createTab(tabCount)
        console.log(s, t, chalk[color][bgColor].bold(msg), s)
    }



    /**
     * @param {string} msg - Will be the message we will log
     * @param {number} spaceCount - Will be how many spaces we want to give
     * @param {number} tabCount - Will be the number of tabs we want to give
     */
    const importantLog = (msg, spaceCount = 0, tabCount = 0) => Log(msg, 'whiteBright', 'bgRed',spaceCount, tabCount)



    /**
     * @param {string} msg - Will be the message we will log
     * @param {number} spaceCount - Will be how many spaces we want to give
     * @param {number} tabCount - Will be the number of tabs we want to give
     */
    const infoLog = (msg, spaceCount = 0, tabCount = 0) => Log(msg, 'whiteBright', 'bgBlueBright',spaceCount, tabCount)



    /**
     * @param {string} msg - Will be the message we will log
     * @param {number} spaceCount - Will be how many spaces we want to give
     * @param {number} tabCount - Will be the number of tabs we want to give
     */
    const confirmLog = (msg, spaceCount = 0, tabCount = 0) => Log(msg, 'blackBright', 'bgGreenBright',spaceCount, tabCount)



    return {
        importantLog,
        infoLog,
        confirmLog
    }
}

module.exports = LoggingService()