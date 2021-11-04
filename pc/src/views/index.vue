<template>
  <div>
		<iframe :src="`/pano2vr/${mineId}/`"/>
	</div>
</template>

<script>
export default {
	name: 'Home',
	data () {
		return {
			mineId: '1',
		}
	},
	created () {
		var { mineId } = this.$route.params
		this.mineId = mineId
	}
}
</script>

<style>
iframe {
	position: fixed;
	width: 100%;
	height: 100%;
}
</style>
