
const doKey = require('../fun/rejson')
//const doFile = require('../fun/writefile')
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
		var mycount = 0
		for (var i in x) {
			for (var j in x[i]) {
		let myObj = Object.keys(x[i][j]).reduce((p, c) => ({...p, [c]: x[i][j][c]}), {})
		//if ((!myObj) || (myObj.type[0].toUpperCase() == myObj.type[0]) || (myObj.type === 'application-site') || (myObj.type === 'application-site-category') || (myObj.type === null) || (myObj.type === '')) {
		if ((!myObj) || (myObj.type === null) || (myObj.type === '')) {
					continue
				} else {
					mycount++
					console.dir(myObj)
					console.log(mycount)
				await doKey.myset(myObj, '_' + mycount)
					}
				}
			}
	} catch (err) {
		throw new Error(err)
	}
}
