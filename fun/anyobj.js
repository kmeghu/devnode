
const Objectclass = require('../class/object')

module.exports = async (x) => {
	try {
		var cpRes = {}
		for (var i in x) {
			for (var j in x[i]) {
				const myObjs = Object.keys(x[i][j]).reduce((p, c) => ({...p, [c]: x[i][j][c]}), {})
				var cpType = myObjs.type
				let cpData = new Objectclass(myObjs)
				if (cpType == 'host') {
					cpRes = cpData.host(myObjs)
				} else if (cpType == 'network') {
					cpRes = cpData.network(myObjs)
				//} else if (cpType == 'group') {
				//	cpRes = cpData.group(myObjs)
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

