const host = window.location.hostname
var baseURL = 'https://kf.v2.vr.api.taobao.top/'
if (host.indexOf('cs') > -1) {
	baseURL = 'https://cs.v2.vr.api.taobao.top/' // 测试环境
} else if (host.indexOf('bitmine') > -1) {
	// baseURL = '' // 生产环境
}
export default {
	baseURL,
	getToken: `${baseURL}index/index/gettoken`, // 获取zg推拉流token
	roomInfo: `${baseURL}index/index/roominfo`, // 获取房间列表
	verify: `${baseURL}index/index/verify`, // 验证房间状态获取身份信息
	updateRoom: `${baseURL}index/index/updateroom`, // 更新房间状态
}