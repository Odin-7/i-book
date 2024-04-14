<template>
	<view class="page">
		<transition name="book-open">
			
			<view v-if="isBookOpen" class="book-content">
				<div v-html="content">{{content}}</div>
			</view>
		</transition>
	</view>
</template>

<script>
	import { paramsGet } from '@/utils/request.js'
	export default {
		data() {
			return {
				title:'', //标题
				content:'', //内容
				isBookOpen: false // 控制书本打开效果的状态
			}
		},
		onLoad: function (option) {
			console.log(option.id);
			console.log(option.title);
			this.title = option.title
			this.id = option.id
		},
		mounted(){
			this.getContent(this.id)
		},
		methods: {
			async getContent(id) {
				console.log(id)
				try {
					const res = await paramsGet('/1700-3',{id})
					console.log(res)
					if(res && res.showapi_res_body.content){
						// 在获取内容后设置状态为打开书本效果
						this.content = res.showapi_res_body.content
						this.isBookOpen = true
					}
				 } catch (error) {
					console.log("获取内容失败", error);
				  }
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		padding:50px 0 ;
		.book-content{
			padding: 0px 20px;
		}
	}
	/* 定义过渡效果 */
	.book-open-enter-active, .book-open-leave-active {
		transition: opacity 0.5s;
	}
	.book-open-enter, .book-open-leave-to {
		opacity: 0;
	}
</style>