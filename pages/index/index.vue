<template>
	<view class="container">
		<!-- 搜索 -->
		<view class="search-header">
			<u-search
				@change = "debounceSearch"
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
		<view class="swiper-header" v-if="!params.keyword">
		   <u-swiper
				:current="currentSwiperIndex"
				:interval = "4000"
				height = "300"
				:list="swiperList"
				previousMargin="55"
				nextMargin="55"
				keyName="image"
				showTitle
				radius="10"
				bgColor="#ffffff"
				:autoplay="true"
				circular
				@click="handleSwiperClick"
			></u-swiper>
		</view>
		<!-- tab栏 -->
		<u-sticky offset-top="30" bgColor="#ffffff">
			<view class="tabs-header">
				<!-- :lineColor="`url(${tabBg}) top center`" -->
				<u-tabs
					v-if="tabs && tabs.length > 0"
					swipeable  
					:current="currentTabIndex"
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
		<!-- 加载中 -->
		<view class="is-loading" v-if="isSearching">
			<Loading />
		    <div class="text">嘘！书本正在悄悄赶来，不要吓到它哦！</div>
		</view>
		<!-- 列表 -->
		
		<view v-else-if="list && list.length > 0">
			<div class="list-main transition">
				<div
					v-for="(item, index) in list"
					:key="item.id"
					class="list-item"
					>
						<div class="book-cover"  @click="toDetail(item)"></div>
						<div class="book-title">{{item.title}}</div>
				</div>
			</div>
			<div class="list-status">
				<u-loadmore line :status="status" fontSize="12px" loadingIcon="semicircle" :icon-type="iconType" :loading-text="loadingText" :loadmore-text="loadmoreText" :nomore-text="nomoreText"  />
			</div>
		</view>
		<!-- 空 -->
		<view class="list-empty" v-else>
			<img src="@/static/books/no-data.png" alt="">
			<div class="text">图书躲起来啦，再找找吧！</div>
		</view>
		<!-- 返回顶部 -->
		<view class="back-top">
			<u-back-top 
				:scroll-top="scrollTop" 
				top="1000" 
				icon="arrow-upward" 	
				:duration="250"
				:iconStyle="iconStyle"
				:custom-style="myBackToTopStyle"
			
			>
			</u-back-top>
		</view>
	</view>
</template>

<script>
	import { paramsGet } from '@/utils/request.js'
	import { debounce } from '@/utils/debounce.js'
	console.log(debounce)
	import Loading from '@/components/loading/loading.vue'
	export default {
		data() {
			return {
				isSearching:false,
				scrollTop: 0,//返回顶部
				params:{
					keyword: '',
					classifyId:1, //分类
					page:1 //页码
				},
				allNum: 0, //总数
				allPages: 0, // 总页数
				currentTabIndex: 0,// 当前选中tab的索引
				currentSwiperIndex:0, // 当前选中Swiper的索引
				id:'',//故事详情id
				tabs: [], //分类
				list:[],
				isLoading: false, // 是否正在加载数据
				status: 'loadmore',
				iconType: 'flower',
				loadingText: '努力加载中',
				loadmoreText: '轻轻上拉',
				nomoreText: '没有更多了',
				swiperList: [
					{
						image: require('@/static/swipers/1.png'),
						title: '儿童小故事',
					},
					{
						image: require('@/static/swipers/2.png'),
						title: '安徒生童话'
					},
					{
						image: require('@/static/swipers/3.png'),
						title: '格林童话'
					},
					{
						image: require('@/static/swipers/4.png'),
						title: '一千零一夜'
					},
					{
						image: require('@/static/swipers/5.png'),
						title: '经典童话'
					},
					{
						image: require('@/static/swipers/6.png'),
						title: '成语故事'
					},
					{
						image: require('@/static/swipers/7.png'),
						title: '寓言故事'
					},
					{
						image: require('@/static/swipers/8.png'),
						title: '民间故事'
					},
					{
						image: require('@/static/swipers/9.png'),
						title: '童话故事'
					},
					{
						image: require('@/static/swipers/10.png'),
						title: '王尔德童话'
					},
				],
				// 自定义返回按钮样式
				myBackToTopStyle: {
					background:'transparent',
					backgroundImage:'url(/static/tab-bg.png)',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' // 添加阴影
				},
				iconStyle: {
					color: '#ffffff',
					fontWeight:'700',
					position: 'relative',
					top:'-30px',
				}
			}
		},
		components: {
			Loading
		},
		created() {
			this.getClassifyTabs();
			this.getContentList()
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
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
				this.isSearching = true
				// 搜索关键字改变时重置页码为1
				this.params.page = 1;
				// 清空列表
				this.list = [];
				try {
					// const res = await classifyGet(`/1700-1?showapi_appid=1571609&showapi_timestamp=${getCurrentDateTime()}&showapi_sign=bf08e510d4a642fb9e168ada13400dbf`)
					const res = await paramsGet('/1700-2',this.params)
					if(res && res.showapi_res_body.contentlist){
						this.list = res.showapi_res_body.contentlist
						this.allNum = res.showapi_res_body.allNum
						this.allPages = res.showapi_res_body.allPages
					}
				} catch (error) {
					console.log("获取书籍列表失败", error);
				} finally{
					this.isSearching = false
				}
				
			},
			// 滚动到底部时加载更多
			async onReachBottom() {
				if (this.params.page >= this.allPages) {
					this.status = 'nomore';
					return; // 如果已经到达最后一页，则不再加载
				}
				this.status = 'loading'; // 设置加载状态为正在加载
				this.params.page++; // 增加页码
				try {
					const res = await paramsGet('/1700-2', this.params); // 调用接口加载更多数据
					if (res && res.showapi_res_body.contentlist) {
						// 将新加载的数据添加到列表中
						this.list = this.list.concat(res.showapi_res_body.contentlist);
					}
					console.log(this.params.page, this.allPages)
					if (this.params.page >= this.allPages) {
						// 如果加载到最后一页，则设置状态为没有更多了
						this.status = 'nomore';
					} else {
						// 如果还有更多数据可以加载，则设置状态为加载更多
						this.status = 'loadmore';
					}
				} catch (error) {
					console.error("加载更多数据失败", error);
					// 加载失败时将状态设置为加载更多，以便用户可以再次触发加载
					this.status = 'loadmore';
				}
			},
			// 切换tab
			handleTabClick(tab){
				if(tab.classifyId === this.params.classifyId) return
				this.params.classifyId = tab.classifyId
				this.getContentList()
				// localStorage.setItem('selectedClassifyId', tab.classifyId);
				// 切换到对应Swiper
				this.currentSwiperIndex = tab.index
				
			},
			// 点击Swiper
			handleSwiperClick(index){
				// 相同 return
				if(index === this.currentTabIndex) return
				this.currentTabIndex = index
				// 切换到对应的标签页并刷新内容列表
				const tab = this.tabs[index];
				if (tab) {
					this.params.classifyId = tab.classifyId;
					this.getContentList();
				}
			},
			// 详情
			toDetail(item){
				setTimeout(() => {
					  uni.navigateTo({
						url: `../bookdetail/bookdetail?id=${item.id}&title=${item.title}`
					  })
				}, 100); 
				
			},
			// 搜索/防抖
			 debounceSearch: debounce(function() {
			    this.getContentList();
			  }, 500),
			onCancel(){
				this.params.keyword = ''
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
		.swiper-header{
			padding: 10px 0;
			// height: 200px;
		}
		.search-header{
			padding: 10px 12px;
			padding-bottom: 8px;
		}
		.tabs-header{
			height: 34px;
			padding-bottom: 3px;
			border-bottom: 1px solid #f2f2f2;
		}
		.is-loading{
			width: 100%;
			margin-top: 15vh;
			// height: calc(100vh - 250px);
			// padding-top: 30%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			.text{
				font-size: 14px;
				margin-top: 10px;
				color: #606266;
			}
		}
		.list-main{
			width: 100%;
			box-sizing: border-box;
			padding: 10px 12px;
			// padding-bottom: 20px;
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
				position: relative;
				// background: pink;
				width: 100%; // 每个子项占满列宽
				height: 250px;
				padding: 10px;
				padding-bottom: 30px;
				// padding-bottom: 0;
				// margin-bottom: 5px;
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
					&:active {
						transform: scale(0.98) translateY(3px);
						opacity: 0.9;
						transition: 80ms;
					}
				}
				
				.book-title{
					position: absolute;
					top: calc(100% - 30px);
					text-align: center;
					margin-top:5px;
					width: 150px;
					// white-space: nowrap; /* 禁止换行 */
					// overflow: hidden; /* 隐藏溢出的文本 */
					// text-overflow: ellipsis; /* 显示省略号 */
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 2; /* 显示的行数 */
					-webkit-box-orient: vertical;
					word-wrap: break-word; /* 允许长单词或URL在内部换行 */
					text-overflow: ellipsis;
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
		.list-status{
			padding: 10px 0 20px 0;
		}
		.list-empty{
			width: 100%;
			margin-top: 15vh;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			>img{
				height: 80px;
			}
			.text{
				font-size: 14px;
				margin-top: 20px;
				color: #606266;
			}
		}
		.back-top{
		}
	}
</style>
