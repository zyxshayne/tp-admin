<template>
  <div class="cim-page">
		<tc-popup
			title="Leaving VR to watch Mine"
			msg="You will leave VR to watch Mine. Do you want to continue?"
			cancelText="Hold On"
			confirmText="Leave"
			v-model="show"
			@cancel="onLogin()"
		/>
		<audio ref="audio" loop preload autoplay playsinline controls hidden/>
		<video v-show="isPlay" ref="video" autoplay playsinline/>
		<iframe v-show="!isPlay" :src="`/pano2vr/${mineID}/`"/>
		<div class="cim-main">
			<div v-if="isLogin">
				<tc-icons :image="serveInfo.headimgurl" size="38" space="8" :imageClass="{
					'border-radius': '50%',
				}">
					<div class="cim-main_info">
						<div>
							<span>{{serveInfo.name}}</span>
						</div>
						<div>customer service</div>
					</div>
				</tc-icons>
			</div>
			<div v-if="isPlay">
				<tc-icons
					:image="require('@/assets/img/phone.png')"
					size="24" space="12"
				>{{time | formatTime}}</tc-icons>
			</div>
			<div v-if="isPlay">
				<tc-icons
					:image="require('@/assets/img/leave.png')"
					size="24" space="10"
					@click="show = true"
				>Leave</tc-icons>
			</div>
			<div v-else>
				<tc-icons
					:image="require('@/assets/img/select.png')"
					size="36" space="10"
					@click="getRoomInfo"
				>VR Watch</tc-icons>
			</div>
		</div>
	</div>
</template>

<script>
import zego from '@/common/zego.js'
var interval = null
export default {
	name: 'Cim',
	data () {
		return {
			zg: null,
			show: false,
			isLogin: false,
			isPlay: false,
			token: '',
			mineID: '',
			time: 0,
			serveInfo: {},
			info: {},
			streamList: [],
		}
	},
	created () {
		var { info } = this
		var { token, mineID } = this.$route.query
		this.token = token
		this.mineID = mineID
	},
	watch: {
		isPlay (n) {
			this.setInterval(n)
		}
	},
	methods: {
		setInterval (flag) {
			if (flag) {
				interval = setInterval(() => {
					this.time += 1
				}, 1000)
				return
			}
			clearInterval(interval)
			this.time = 0
		},
		onLogin (flag) {
			this.isLogin = flag
			if (flag) {
				zego.loginRoom()
				return
			}
			this.pushAudioStream()
			this.pullStream(this.streamList)
			this.streamList = []
			zego.logoutRoom()
		},
		pushAudioStream (flag) {
			var { info } = this
			flag
			 ? zego.startPublishingStream(`${info.streamID}audio`, true)
			 : zego.stopPublishingStream(`${info.streamID}audio`)
		},
		pullVideoStream (streamID, flag) {
			if (flag) {
				zego.startPlayingStream(streamID)
				.then(stream => {
					this.$refs.video.srcObject = stream
					this.isPlay = true
				})
			} else {
				zego.stopPlayingStream(streamID)
				this.$refs.video.srcObject = null
				this.isPlay = false
			}
		},
		pullAudioStream (streamID, flag) {
			if (flag) {
				zego.startPlayingStream(streamID)
				.then(stream => {
					this.$refs.audio.srcObject = stream
				})
			} else {
				zego.stopPlayingStream(streamID)
				this.$refs.audio.srcObject = null
			}
		},
		pullStream (streamList, flag) {
			streamList.forEach(item => {
				if (item.streamID.indexOf('audio') > -1) {
					this.pullAudioStream(item.streamID, flag)
				} else {
					this.pullVideoStream(item.streamID, flag)
				}
			})
		},
		initEvent () {
			var { zg } = this
			// 房间状态更新回调
			zg.on('roomStateUpdate', (roomID, state, errorCode) => {
				console.warn('roomStateUpdate：', state)
				if (state === 'CONNECTED') {
					// 与房间连接成功
					zego.createAudioStream()
					.then(() => {
						this.pushAudioStream(true)
						this.updateRoom({
							count: 'add',
						})
					})
				} else if (state === 'DISCONNECTED') {
					// 与房间连接断开
					this.updateRoom({
						count: 'reduce',
					})
				}
			})
			// 流状态更新回调
			zg.on('roomStreamUpdate', async (roomID, updateType, streamList) => {
				console.warn('roomStreamUpdate：', updateType)
				console.log(streamList)
				if (updateType === 'ADD') {
					// 流新增
					this.streamList.push(...streamList)
					this.pullStream(streamList, true)
				} else if (updateType === 'DELETE') {
					// 流减少
					this.onLogin()
				}
			})
		},
		updateRoom (data) {
			console.log('开始更新房间')
			var { roomID, userID, userName } = this.info
			this.$http.updateRoom({
				room_id: roomID,
				user_id: userID,
				user_name: userName,
				...data,
			})
		},
		verify (roomID) {
			console.log('开始获取用户信息')
			var { token } = this
			this.$http.verify({
				room_id: roomID,
				token,
			})
			.then(({ user }) => {
				var { id, name } = user
				this.info = {
					roomID,
					streamID: id,
					userID: id,
					userName: name,
				}
				zego.init(this.info)
				.then(res => {
					this.zg = res
					this.initEvent()
					this.onLogin(true)
				})
			})
		},
		getRoomInfo () {
			if (this.isLogin) return
			console.log('开始获取房间信息')
			var { token, mineID } = this
			this.$http.roomInfo({
				mine_id: mineID,
				token,
			})
			.then(({ room_id, userserver }) => {
				this.serveInfo = userserver
				this.verify(room_id)
			})
		},
	}
}
</script>

<style lang="scss" scoped>
.cim-page {
	iframe,
	video {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	iframe {
		box-sizing: border-box;
	}
	video {
		background-color: #000;
	}
	.cim-main {
		position: fixed;
		left: 50%;
		bottom: 40px;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-family: SFUIDisplay, SFUIDisplay-Regular;
		box-sizing: border-box;
		padding: 10px 0;
		color: #FFF;
		background-color: rgba(0, 0, 0, 0.60);
		border: 6px solid rgba(255, 255, 255, 0.20);
		border-radius: 4px;
		font-size: 18px;
		& > div {
			margin: 0 22px;
		}
		.cim-main_info {
			& > div:first-child {
				font-family: SFUIDisplay, SFUIDisplay-Semibold;
				font-weight: 600;
			}
			& > div:last-child {
				font-size: 12px;
				opacity: 0.6;
			}
		}
	}
}
</style>
