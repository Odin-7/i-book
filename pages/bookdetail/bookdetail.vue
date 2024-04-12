<template>
	<view class="page">
		<!-- <u-navbar
			:title="title"
			@rightClick="rightClick"
			:autoBack="true"
		>
		</u-navbar> -->
		<view class="book-content">
			<div v-html="content">{{content}}</div>
		</view>
		
	</view>
</template>

<script>
	import { paramsGet } from '@/utils/request.js'
	export default {
		data() {
			return {
				title:'', //标题
				content:''//内容
				
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.id); //打印出上个页面传递的参数。
			console.log(option.title); //打印出上个页面传递的参数。
			this.title = option.title
			this.id = option.id
		},
		mounted(){
			this.getContent(this.id)
		},
		methods: {
			// 获取书籍详情
			async getContent(id) {
				console.log(id)
				try {
					const res = await paramsGet('/1700-3',{id})
					console.log(res)
					if(res && res.showapi_res_body.content){
						this.content = res.showapi_res_body.content
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
</style>