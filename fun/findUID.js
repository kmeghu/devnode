/* i is the index, x is the array. increase i until
we reach the max using i++, and output the uid
for each. */

module.exports = async (x) => {
	try {
		var cpRes = {}
		for (var i in x) {
			for (var j in x[i]) {
				const myObjs = Object.keys(x[i][j]).reduce((p, c) => ({...p, [c]: x[i][j][c]}), {})
				var cpType = myObjs.type
				cpRes.key = 'obj/tag/' + cpType + '/' + myObjs.uid
				let cpData = new Objectclass(myObjs)
				if (cpType == 'uid') {
					cpRes.value = JSON.stringify(cpData.host(myObjs))
					console.log()
                }
            
            