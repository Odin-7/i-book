<template>
	<view class="page">
		<transition name="book-open">
			<view v-if="isBookOpen" class="book-box">
				<!-- <div class="title">{{title}}</div> -->
				<div class="content" v-html="content">{{content}}</div>
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
			this.title = option.title
			this.id = option.id
			uni.setNavigationBarTitle({
			    title: this.title
			});
		},
		mounted(){
			this.getContent(this.id)
			 document.title = this.title; 
		},
		methods: {
			async getContent(id) {
				try {
					const res = await paramsGet('/1700-3',{id})
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
		min-height: calc(100vh - 44px);
		overflow: auto;
		background-image: url(@/static/book-bg.png);
		background-color: #fff;
		background-size: 100% 100%;
		.book-box{
			padding: 20px;
			padding-bottom: 40px;
			.title{
				width: 100%;
				text-align: center;
				font-size: 18px;
				font-weight: 700;
				padding-bottom: 15px;
			}
			.content{
				letter-spacing: 1px;
				text-indent: 2em;
				line-height: 2em;
			}
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