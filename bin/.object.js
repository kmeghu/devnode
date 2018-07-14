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
const doWrite = require('../fun/writefile')
const doKey = require('../fun/writekey')
// this parser will backup all found objects to obj/uid
//
//const doParse = require('../fun/objkey')
// this will just dump the key for analysis
//const doParse = require('../fun/testobj')

const doParse = require('../fun/hosts')
//const cpSession = require('../playground/session.json')
const cpLive = require('../fun/session')
const Cptoken = require('../class/token')

// example runtime for your class method
//

module.exports = async (args) => {
	try {
		const cpSession = await cpLive()
		if (!cpSession.uid) {
			console.log('No Active Session, please login')
			require('../bin/help')
			return
		}
		if (!args.type) {
			args.type = 'object'
		}

		let Myevent = await new Cptoken(cpSession)
		//await doWrite('token', myToken)
		//await console.dir(cpSession)
		// run api commands here
		//
		await Myevent.print()
		let mydata = await Myevent.setOff(0, 500, 'standard')
		let myshow = await Myevent.getMe(cpSession, mydata, args)
		let mypage = await Myevent.setPage(myshow.data.from, myshow.data.to, myshow.data.total)
		process.stdout.write(' ' + myshow.data.to + ' of ' + myshow.data.total + ' ')
		//await console.dir(mydata)
		//await console.dir(mypage)
		await doParse(myshow.data)
		//await console.log('\n')
		if (mypage.total > mydata.offset) {
			mydata.offset = Number(mydata.offset) + Number(mydata.limit)
			while (mypage.total > mydata.offset) {
				//console.log(`${mypage.total} is more than the ${mypage.to}`)
				mydata = await Myevent.setOff(mydata.offset, 500, 'standard')
				myshow = await Myevent.getMe(cpSession, mydata, args)
				mypage = await Myevent.setPage(myshow.data.from, myshow.data.to, myshow.data.total)
				process.stdout.write(' ' + myshow.data.to + ' of ' + myshow.data.total + '      ')
				//await console.dir(myshow.data.objects)
				await doParse(myshow.data)
				//await Myevent.print()
				//console.log(`${mydata.offset} of ${mypage.total} objects indexed`)
				mydata.offset = Number(mydata.offset) + Number(mydata.limit)
			}
			//console.log(`${mydata.offset} of ${mypage.total} objects indexed`)
		}
				await console.log('\n')

		//await doWrite('objects', myshow.data.objects)
		//await console.dir(myshow.data)
		//
		//let myclose = await myToken.closeToken(myToken)
		//await doWrite('session', myclose.data)
		//await console.dir(myclose.data)
		//return mypage
	} catch (err) {
		console.log('ERROR IN SESSION event for %j', cpSession)
		console.log(err)
	}
}

