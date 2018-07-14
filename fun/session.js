
const Keysession = require('../class/keystore')

module.exports = async () => {
	try {
		const cpKeys = new Keysession()
		await cpKeys.setKeyhost()
		await cpKeys.getKey('api/session')
		const cpsend = await cpKeys.resVal()
		const cpSession = await JSON.parse(cpsend)
		await cpKeys.setOpt(cpsend)
		await cpKeys.setKey('api/session', cpsend)
		return await cpSession
	} catch (err) {
		console.log(err)
		//return process.exit(1)
		
	}
}

