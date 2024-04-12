<template>
	<view class="container">
		<!-- 搜索 -->
		<view class="search-header">
			<u-search
				@change = "getContentList"
				shape="round"
				v-model="params.keyword"
				placeholder="搜索书库"
				:clearabled="false"
				searchIconSize="28px" 
				actionText="取消" 
				:animation="true"
				@custom="onCancel"
				height="40px"
				color="#000000"
			></u-search>
		</view>
		<!-- tab栏 -->
		<u-sticky offset-top="30" bgColor="#ffffff">
			<view class="tabs-header">
				<u-tabs
					v-if="tabs && tabs.length > 0"
					swipeable  
					:list="tabs"
					 lineWidth="20px"
					 lineHeight="3px"
					:activeStyle="{
						color: '#000000',
						fontWeight: 'bold',
						transform: 'scale(1.05)'
					}"
					 :inactiveStyle="{
						color: '#606266',
					}"
					itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
					@click="handleTabClick"
				></u-tabs>
				<!-- v-else -->
			</view>
		</u-sticky>
		<!-- <u-gap height="20" bg-color="#f2f2f2"></u-gap> -->
		<view class="list-main" v-if="list && list.length > 0">
			<div 
				v-for="(item, index) in list"
				:key="item.id"
				class="list-item"
				>
					<div class="book-cover" @click="toDetail(item)"></div>
					<div class="book-title">{{item.title}}</div>
			</div>
		</view>
		<view class="list-empty" v-else>
			<!-- icon="https://cdn.uviewui.com/uview/demo/empty/data.png" -->
			<u-empty
				mode="search"
			>
			</u-empty>
		</view>
		<!-- 返回顶部 -->
		<view class="back-top">
			<u-back-top :scroll-top="scrollTop" top="1000" icon="arrow-up" :duration="250"></u-back-top>
		</view>
	</view>
</template>

<script>
	import { paramsGet } from '@/utils/request.js'
	import { debounce } from '@/utils/debounce.js'
	export default {
		data() {
			return {
				scrollTop: 0,//返回顶部
				params:{
					keyword: '',
					classifyId:1, //分类
					page:1 //页码
				},
				id:'',//故事详情id
				tabs: [], //分类
				
				list:[],
				indexList: [],
				urls: [
					'https://cdn.uviewui.com/uview/album/1.jpg',
					'https://cdn.uviewui.com/uview/album/2.jpg',
					'https://cdn.uviewui.com/uview/album/3.jpg',
					'https://cdn.uviewui.com/uview/album/4.jpg',
					'https://cdn.uviewui.com/uview/album/5.jpg',
					'https://cdn.uviewui.com/uview/album/6.jpg',
					'https://cdn.uviewui.com/uview/album/7.jpg',
					'https://cdn.uviewui.com/uview/album/8.jpg',
					'https://cdn.uviewui.com/uview/album/9.jpg',
					'https://cdn.uviewui.com/uview/album/10.jpg',
				]
			}
		},
		created() {
			this.getClassifyTabs();
			this.getContentList()
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad() {	
			this.loadmore()
		},
		methods: {
			// 获取故事分类
			async getClassifyTabs() {
				try {
					// const res = await classifyGet(`/1700-1?showapi_appid=1571609&showapi_timestamp=${getCurrentDateTime()}&showapi_sign=bf08e510d4a642fb9e168ada13400dbf`)
					const res = await paramsGet('/1700-1')
					if(res && res.showapi_res_body.storylist){
						this.tabs = res.showapi_res_body.storylist.map(item => ({
						  name: item.classify,
						  classifyId: item.classifyId 
						}));
					}
				 } catch (error) {
					console.log("获取分类信息失败", error);
				  }
			},
			// 获取列表
			async getContentList() {
				try {
					// const res = await classifyGet(`/1700-1?showapi_appid=1571609&showapi_timestamp=${getCurrentDateTime()}&showapi_sign=bf08e510d4a642fb9e168ada13400dbf`)
					const res = await paramsGet('/1700-2',this.params)
					if(res && res.showapi_res_body.contentlist){
						this.list = res.showapi_res_body.contentlist
					}
				 } catch (error) {
					console.log("获取书籍列表失败", error);
				  }
				
			},
			// 切换tab
			handleTabClick(tab){
				this.params.classifyId = tab.classifyId
				this.getContentList()
			},
			// 详情
			toDetail(item){
				uni.navigateTo({
					url: `../bookdetail/bookdetail?id=${item.id}&title=${item.title}`
				})
			},
			// 搜索
			// onSearch: debounce(() => {
			// 	this.getContentList();
			// }, 300),
			onCancel(){
				this.params.keyword = ''
			},
			
			scrolltolower() {
				this.loadmore()
			},
			loadmore() {
				for (let i = 0; i < 101; i++) {
					this.indexList.push({
						url: this.urls[uni.$u.random(0, this.urls.length - 1)]
					})
					}
				}
			}
		
	}
	
</script>

<style lang="scss">
	$base-url: "@/static/books/book-cover-";
	.container {
		margin: 0 auto;
		max-width: 1000px;
		height: 100%;
		width: 100%;
		position: relative;
		.search-header{
			padding: 10px 12px;
			padding-bottom: 8px;
		}
		.tabs-header{
			height: 34px;
			padding-bottom: 3px;
			border-bottom: 1px solid #f2f2f2;
		}
		.list-main{
			width: 100%;
			box-sizing: border-box;
			padding: 10px 12px;
			padding-bottom: 20px;
			display: grid;
			grid-gap: 20px;
			// grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); // 设置自适应列数，每列最小宽度200px，最大占据可用空间
			 grid-template-columns: repeat(5, 1fr);
			justify-content: space-between; // 将列之间的空间平均分布
			@media screen and (max-width: 1400px) {
			  grid-gap: 15px;
			  grid-template-columns: repeat(5, 1fr); // 在较小的屏幕下显示5列
			}
			@media screen and (max-width: 1000px) {
			  grid-gap: 10px;
			  grid-template-columns: repeat(4, 1fr); // 在更小的屏幕下显示4列
			}
			@media screen and (max-width: 768px) {
			  grid-gap: 5px;
			  grid-template-columns: repeat(3, 1fr); // 在最小的屏幕下显示3列
			}
			>div{
				width: 100%; // 每个子项占满列宽
				height: 250px;
				padding: 10px;
				padding-bottom: 0;
				margin-bottom: 5px;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 12px;
				@media screen and (max-width: 768px) {
					height: 250px;
				}
				@media screen and (max-width: 600px) {
					height: 200px;
				}
				@media screen and (max-width: 450px) {
					height: 180px;
				}
				// &:nth-child(12n){
				// 	.book-cover{
				// 		background-image: url(@/static/books/book-cover-1.png);
				// 	}
				// }
				@for $i from 1 through 7 {
				  &:nth-child(#{$i}n) {
				    .book-cover {
				      background-image: url(#{$base-url + $i}.png);
				    }
				  }
				}
				.book-cover{
					width: 100%;
					height: 100%;
					
					background-repeat: no-repeat;
					background-size: cover;
					background-position: 0% 100%;
					box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3); 
					border-radius: 4px; 
				}
				
				.book-title{
					text-align: center;
					margin-top:5px;
					white-space: nowrap; /* 禁止换行 */
					overflow: hidden; /* 隐藏溢出的文本 */
					text-overflow: ellipsis; /* 显示省略号 */
					width: 150px;
					@media screen and (max-width: 768px) {
						width: 110px;
					}
					@media screen and (max-width: 450px) {
						width: 90px;
					}
					@media screen and (max-width: 360px) {
						width: 60px;
					}
				}
			}
		}
		.list-empty{
			margin-top: 25%;
		}
	}
</style>
