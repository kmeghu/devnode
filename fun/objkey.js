
const doKey = require('../fun/writekey')
const doTags = require('../bin/tags')
// this function takes in the raw check point object, and indexes it as a full object
// without using a class. Rather then load a full method, you just want the details
// we index all objects in a keystore cache of obj/uid/myObj.type/myObj.uid
// with the full json return value of this item as the value.
//
// This allows retrivial of full object properties from in memory keystore
//
// The writekey function simply applies x.key, x.value (must be stringified for keystore)
// to the etcd. Sub in other key functions to taste.
//
// applying writekey function 


module.exports = async (x) => {
	try {
		let mycount = 0
		var cpRes = {}
		const cpCheck = {}
		for (var i in x) {
			for (var j in x[i]) {
				const myObj = Object.keys(x[i][j]).reduce((p, c) => ({...p, [c]: x[i][j][c]}), {})
				await console.dir(myObj)
				if (myObj.type == 'host' || myObj.type == 'network') {
				cpCheck.uid = await myObj.uid
					mycount++
				cpRes.key = 'uid/' + myObj.uid 
				cpRes.value = JSON.stringify(myObj)
				await doKey(cpRes)
				const whereused = await doTags(cpCheck)
				await console.dir(whereused)
					return await whereused
				} else {
					continue
				}
			}
		}
		return
	} catch (err) {
		console.error(err)
	}
}


//Object.entries(obj).forEach(([key, value]) => console.log(`${key}: ${value}`)); 

