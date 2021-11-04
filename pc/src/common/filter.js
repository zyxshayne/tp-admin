export default {
	formatTime (time) {
		var hour = parseInt(time / 6000 % (3600 * 24))
		var minute = parseInt(time / 60 % (60 * 60))
		var second = parseInt(time % 60)
		return `${`0${hour}`.slice(-2)}:${`0${minute}`.slice(-2)}:${`0${second}`.slice(-2)}`
	}, // 格式化时间（ms）
	formatDate (time, format = 'YYYY-MM-DD hh:mm:ss') {
		var date = new Date(time),
			year = date.getFullYear(),
			month = date.getMonth() + 1,
			day = date.getDate(),
			hour = date.getHours(),
			minute = date.getMinutes(),
			second = date.getSeconds()
		return format
		.replace('YYYY', year)
		.replace('MM', `0${month}`.slice(-2))
		.replace('DD', `0${day}`.slice(-2))
		.replace('hh', `0${hour}`.slice(-2))
		.replace('mm', `0${minute}`.slice(-2))
		.replace('ss', `0${second}`.slice(-2))
	}, // 格式化日期（ms）
}