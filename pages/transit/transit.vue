<template>
	<view class="transit-base">
		<view class="transit-banner">
			<view class="img-div" @click="jumpPersonal">
				<image src="http://tchy.01vk.com/storage/red72.png" alt="">
			</view>
			<view class="name">
				<text>{{ name }}</text>
			</view>
		</view>
		<view class="add-car" v-show="add_show">
			<view class="add-car-div">
				<view class="add-icon" @click="addCar">
					<uni-icons type="plusempty" size="34"></uni-icons>
				</view>
			</view>
		</view>
		<view class="add-car" v-for="(item,index) in list" :key="index">
			<view class="car-card" @click="carDetail(item.id)">
				<view class="card-title">
					<view>{{item.spec}}</view>
					<view>{{item.time}}</view>
				</view>
				<view class="car-detail">
					<view>
						<view>姓名</view>
						<view>{{item.name}}</view>
					</view>
					<view>
						<view>车牌号</view>
						<view>{{item.car_number}}</view>
					</view>
					<view>
						<view>手机号</view>
						<view>{{item.mobile}}</view>
					</view>
					<view>
						<view>身份证号</view>
						<view>{{item.idcard}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {uniIcons},
		data() {
			return {
				add_show:true,
				list:[],
				name:''
			}
		},
		onLoad() {
			var loginRes = this.checkLogin();
				if (!loginRes) {
					return false;
				}
		},
		created() {
			let token = uni.getStorageSync('tokenlo')
			let uid = uni.getStorageSync('uuid')
			if(! token) {
				uni.navigateTo({
					url: '/pages/index/index'
				});
			}
			let self = this;
			this.axios.request({
			        url:'/api/user/get/car/list?time='+new Date().getTime(),
			        method:'get',
					header:{
							  'Authorization':'Bearer '+token
							},
			    }).then(function({data}){
					if(data.data) {
						self.list = data.data
						// self.add_show = false
					} else {
						self.add_show = true
					}
			    }).catch(err => {
			        console.log(err)
			    })
			this.axios.request({
					url:'/api/user/get/user/data?time='+new Date().getTime(),
					method:'get',
					header:{
							  'Authorization':'Bearer '+token
							},
				}).then(function({data}){
					if(data.data) {
						self.name = data.data.name
						self.add_show = data.data.bool
					}
				}).catch(err => {
					console.log(err)
					uni.removeStorage({
						key:"tokenlo",
						success: function (res) {
						        uni.navigateTo({
						        	url: '/pages/index/index'
						        });
						    }
					});
				})
		},
		methods: {
			addCar() {
				uni.navigateTo({
					url: '/pages/add/add'
				});
			},
			carDetail(id) {
				uni.setStorage({
					key:"carId",
					data:id
				})
				uni.navigateTo({
					url: '/pages/show/show'
				});
			},
			jumpPersonal() {
				uni.navigateTo({
					url: '/pages/personal/personal'
				});
			}
		}
	}
</script>

<style>
	page {
		background: #e2e2e2;
	}
	.transit-banner {
		text-align: center;
		background: red;
		height: 12rem;
		padding-top: 4rem;
		background-color: red; /* 浏览器不支持时显示 */
		    background-image: linear-gradient(#fb5100, #ff9a43)
	}
	.name {
		margin-top: .5rem;
		font-size: 32upx;
		color: #FFFFFF;
	}
	.img-div {
		width: 164upx;
		height: 164upx;
		margin: 0 auto;
	}
	.img-div image {
		width: 100%;
		border-radius: 50%;
		height: 164upx;
	}
	.add-car .add-car-div {
		height: 6rem;
		background: #FFFFFF;
		margin: .5rem;
		border-radius: 10upx;
		text-align: center;
		padding: 1.3rem;
	}
	.car-card {
		height: 6rem;
		background: #FFFFFF;
		margin: .5rem;
		border-radius: 10upx;
		text-align: center;
	}
	.add-icon {
		width: 120upx;
		height: 120upx;
		background: #ececec;
		line-height: 120upx;
		margin: 0 auto;
		margin-bottom: 4upx;
		border-radius: 20upx;
	}
	.card-title {
		display: flex;
		justify-content:space-between;
		height: 60upx;
		line-height: 60upx;
		font-size: 30upx;
		padding: 0 20upx;
		border-bottom: 1px solid #f1f1f1;
	}
	.car-detail {
		text-align: left;
		padding: 0 20upx;
	}
	.car-detail view {
		display: flex;
	}
	.car-detail view view:first-child{
		width: 24%;
	}
</style>
