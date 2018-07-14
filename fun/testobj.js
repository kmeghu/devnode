

module.exports = async (x) => {
	try {
		var cpRes = []
		if (x.hasOwnProperty('objects')) {
			console.log(' has objects property to index')
			Object.entries(x.objects).forEach(([key, value]) => cpRes.push(value))
			return cpRes
			}
	} catch (err) {
		console.error(err)
	}
}



