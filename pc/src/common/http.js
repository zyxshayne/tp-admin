import request from './request.js'
import $api from './api.js'

export default {
	getToken (data) {
		return request({
			url: $api.getToken,
			method: 'POST',
			data,
		})
	},
	roomInfo (params) {
		return request({
			url: $api.roomInfo,
			method: 'POST',
			params,
		})
	},
	verify (params) {
		return request({
			url: $api.verify,
			params,
		})
	},
	updateRoom (data) {
		return request({
			url: $api.updateRoom,
			method: 'POST',
			data,
		})
	},
}