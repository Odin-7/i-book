<template>
	<view class="container">
		<!-- 搜索 -->
		<view class="search-header">
			<u-search
				shape="round"
				v-model="keyword"
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
		<u-sticky offset-top="30px" bgColor="#ffffff">
			<view class="tabs-header">
				<u-tabs
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
				></u-tabs>
			</view>
		</u-sticky>
		<!-- <u-gap height="20" bg-color="#f2f2f2"></u-gap> -->
		<view class="list-main" v-if="list && list.length > 0">
			<div 
				v-for="(item, index) in indexList"
				:key="index"
				class="list-item"
				>
					<div class="book-cover"></div>
					<div class="book-title">格林童话故事</div>
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
	import aloysTab from "@/components/aloys-tab/aloys-tab.vue"
	import lvSelect from '../../components/lv-select/lv-select'
	import booklist from '../../components/booklist/booklist.vue'
	import icon from '../../components/dn-icon/dn-icon.vue'
	import booklistworman from '../../components/booklist/booklistworman.vue'
	import publish from "../../components/publish/publish.vue"

	export default {
		
		components: {
			aloysTab,
			lvSelect,
			booklist,
			icon,
			booklistworman,
			publish,
		
		},
		data() {
			return {
				scrollTop: 0,//返回顶部
				keyword: '',
				tabs: [{
					name: '关注关注',
				}, {
					name: '推荐',
				}, {
					name: '电影'
				}, {
					name: '科技'
				}, {
					name: '音乐'
				}, {
					name: '美食'
				}, {
					name: '文化'
				}, {
					name: '财经'
				}, {
					name: '手工'
				}],
				list:['111'],
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
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad() {	
			this.loadmore()
		},
		methods: {
			onCancel(){
				this.keyword = ''
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
				.book-cover{
					width: 100%;
					height: 100%;
					background-image: url(@/static/list/book-cover.png);
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
