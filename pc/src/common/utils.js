export default {
	getUrlParam (name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
		var r = window.location.search.substr(1).match(reg)
		return r ? unescape(r[2]) : null
	},
}