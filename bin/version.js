//const { version } = require('../package.json')
const mypkg = require('../package.json')

//module.exports = (args) => {
	console.log(`\n ${mypkg.name} v${mypkg.version}`)
	console.log(`${mypkg.description}`)
	console.log(`created by ${mypkg.author}\n`)
//}

