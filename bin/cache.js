"use strict";
// STOP - THIS IS A TEMPLATE
//
// copy this to the new filename for your class method
// put a copy of your main runtime with the class in bin/
// put a copy of the class constructor in class/
// put a copy of the functions your class needs in fun/

// main runtime
// recieve and process args from the callout
// this will show you return values of your args 
// for runtime
//
// this parser will backup all objects to uid/
//
const doParse = require('../fun/cache')
//
// grab our current session from keystore
const cpLive = require('../fun/session')
// apply our class method for token auth
const Cptoken = require('../class/token')

// runtime for cache with class method
//

module.exports = async () => {
	try {
		const cpSession = await cpLive()
		await console.dir(cpSession)
		let Myevent = await new Cptoken(cpSession)
		let mydata = await Myevent.setOff(0, 500, 'full')
		let myshow = await Myevent.showObjects(cpSession, mydata)
		let mypage = await Myevent.setPage(myshow.data.from, myshow.data.to, myshow.data.total)
		process.stdout.write(' ' + myshow.data.to + ' of ' + myshow.data.total + ' ')
		await doParse(myshow.data)
		if (mypage.total > mydata.offset) {
			mydata.offset = Number(mydata.offset) + Number(mydata.limit)
			while (mypage.total > mydata.offset) {
				mydata = await Myevent.setOff(mydata.offset, 500, 'full')
				myshow = await Myevent.showObjects(cpSession, mydata)
				mypage = await Myevent.setPage(myshow.data.from, myshow.data.to, myshow.data.total)
				process.stdout.write(' ' + myshow.data.to + ' of ' + myshow.data.total + '      ')
				await doParse(myshow.data)
				mydata.offset = Number(mydata.offset) + Number(mydata.limit)
			}
		}

	} catch (err) {
		console.log('ERROR IN SESSION event for %j', cpSession)
		console.log(err)
	} finally {
		console.log('finally done')
	}
}

