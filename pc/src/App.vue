<template>
  <div>
		<router-view/>
	</div>
</template>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
}
.status {
	display: inline-block;
	position: relative;
	font-family: PingFangSC, PingFangSC-Regular;
	font-size: 12px;
	color: #757575;
	padding-left: 10px;
	&:before {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: #ff0404;
	}
}
</style>
