<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	::-webkit-scrollbar {
	  width: 0 !important;
	}
	::-webkit-scrollbar {
	  width: 0 !important;
	  height: 0;
	}
	::-webkit-scrollbar {
		/*隐藏滚轮*/
		display: none;
	}
</style>
