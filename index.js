const minimist = require('minimist')
const fs = require('fs')

const mload = './bin/'
console.log('\n')

module.exports = () => {
//
	let cmd = 'help'
	const args = minimist(process.argv.slice(2))
	console.log('arg input: %j', args)
	if (fs.existsSync(mload + args._[0] + '.js')) {
		cmd = args._[0] 
		console.log('RUNTIME: ctrl ' + cmd)
	} else {
		console.log('ctrl command not found : ' + args._[0])
	}

	if (args._[0] == 'ctrl' || args.version || args.v) {
		console.log('version args : %j', args)
		cmd = 'version'
	}
	if (args.help || args.h) {
		console.log('help args : %j', args)
		cmd = 'help'
	}

	switch (cmd) {
		case 'version':
			console.log('running ' + mload + cmd)
			require(mload + cmd)
				break
		case 'help':
			console.log('running help')
			require(mload + cmd)(args)
				break
		default:
			//let mload = `./bin/${cmd}`
			console.log('running ' + mload + cmd)
			require(mload + cmd)(args)
				break
	}
}

