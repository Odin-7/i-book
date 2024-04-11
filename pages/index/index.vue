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
				height="70"
				color="#000000"
			></u-search>
		</view>
		<!-- tab栏 -->
		<u-sticky offset-top="30" bgColor="#ffffff">
			<view class="tabs-header">
				<u-tabs
					:list="tabs"
					 lineWidth="30"
					 lineHeight="7"
					:activeStyle="{
						color: '#000000',
						fontWeight: 'bold',
						transform: 'scale(1.1)'
					}"
					 :inactiveStyle="{
						color: '#606266',
					}"
					itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
				></u-tabs>
			</view>
		</u-sticky>
		<view class="list-main" v-if="list && list.length > 0">
			<u-list
				@scrolltolower="scrolltolower"
			>
				<u-list-item
					v-for="(item, index) in indexList"
					:key="index"
				>
					
					<u-cell
						:title="`列表长度-${index + 1}`"
					>
						<u-avatar
							slot="icon"
							shape="square"
							size="35"
							:src="item.url"
							customStyle="margin: -3px 5px -3px 0"
						></u-avatar>
					</u-cell>
				</u-list-item>
			</u-list>
		</view>
		<view class="list-empty" v-else>
			<!-- icon="https://cdn.uviewui.com/uview/demo/empty/data.png" -->
			<u-empty
				mode="search"
			>
			</u-empty>
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
				for (let i = 0; i < 30; i++) {
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
		height: 100%;
		width: 100%;
		position: relative;
		.search-header{
			padding: 10px 12px;
		}
		.tabs-header{
			heiht:70px;
			background-color: 'pink'
		}
		.list-main{
			padding: 10px 12px;
			padding-top: 5px;
		}
		.list-empty{
			margin-top: 25%;
		}
	}
</style>
