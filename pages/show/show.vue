<template>
	<view class="content">
		<cu-custom class="show-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText"></block>
		    <block slot="content">司机信息</block>
		</cu-custom>
		<view class="of-line">
			<view class="car-upload-idcard img-cls-css">
				<view class="first-input-view">
					<text>身份证正面:</text>
				</view>
				<view>
					<image :src="first_img" alt="">
				</view>
			</view>
			<view class="car-upload-idcard img-cls-css">
				<view class="first-input-view">
					<text>身份证反面:</text>
				</view>
				<view>
					<image :src="back_img" alt="">
				</view>
			</view>
			<view class="car-upload-idcard img-cls-css">
				<view class="first-input-view">
					<text>上传行驶证:</text>
				</view>
				<view>
					<image :src="vehicle_license" alt="">
				</view>
			</view>
			<view class="car-upload-idcard img-cls-css">
				<view class="first-input-view">
					<text>上传驾驶证:</text>
				</view>
				<view>
					<image :src="driving_licence_img" alt="">
				</view>
			</view>
			<view class="car-upload-idcard img-cls-css">
				<view class="first-input-view">
					<text>行驶证所有人照片:</text>
				</view>
				<view>
					<image :src="vehicle_men" alt="">
				</view>
			</view>
			<view class="car-upload-idcard img-cls-css">
				<view class="first-input-view">
					<text>车辆45度照片:</text>
				</view>
				<view>
					<image :src="car_ext_img" alt="">
				</view>
			</view>
			
			<view class="car-input">
				<text>姓名:</text><input type="text" v-model="name">
			</view>
			<view class="car-input">
				<text>手机号:</text><input type="text" v-model="mobile">
			</view>
			<view class="car-input">
				<text>微信号:</text><input type="text" v-model="we_chat">
			</view>
			<view class="car-input">
				<text>身份证号:</text><input type="text" v-model="idcard">
			</view>
			<view class="car-input">
				<text>紧急联系人:</text><input type="text" v-model="linkman">
			</view>
			<view class="car-input">
				<text>联系人号码:</text><input type="text" v-model="linkman_tel">
			</view>
			<view class="car-input">
				<text>联系人关系:</text><input type="text" v-model="relation">
			</view>
			<view class="car-input">
				<text>现居地:</text><input type="text" v-model="addr" class="addr">
			</view>
			<view class="car-input">
				<text>车辆类型:</text><input type="text" v-model="type">
			</view>
			<view class="car-input">
				<text>车牌号:</text><input type="text" v-model="car_number">
			</view>
			<view class="car-input">
				<text>车牌颜色:</text><input type="text" v-model="car_color">
			</view>
			<view class="car-input">
				<text>车辆规格:</text><input type="text" v-model="spec">
			</view>
			<view class="car-input">
				<text>车厢:</text><input type="text" v-model="carriage">
			</view>
			<view class="car-input last-input">
				<text>车身:</text><input type="text" v-model="car_body">
			</view>
		</view>
		<view class="push-btn">
			<button type="default" @click="jumpUpdate()">修改信息</button>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {uniIcons},
		data() {
			return {
			  percent:0,
			  loading:false,
			  disabled:false,
			  addr:'',
			  back_img:'',
			  car_body:'',
			  car_color:'',
			  car_ext_img:'',
			  car_number:'',
			  carriage:'',
			  driving_licence_img:'',
			  first_img:'',
			  idcard:'',
			  linkman:'',
			  linkman_tel:'',
			  mobile:'',
			  name:'',
			  relation:'',
			  spec:'',
			  type:'',
			  vehicle_license:'',
			  vehicle_men:'',
			  we_chat:''
			}
		},
		onLoad() {
			if(! uni.getStorageSync('tokenlo')) {
				uni.navigateTo({
					url: '/pages/index/index'
				});
			}
		},
		created(){
			let self = this;
			this.axios.request({
			        url:'/api/user/get/car/data?time='+new Date().getTime(),
			        method:'post',
					header:{
							  'Authorization':'Bearer '+uni.getStorageSync('tokenlo')
							},
					data:{id:uni.getStorageSync('carId')}
			    }).then(function(res){
					let data = res.data.data[0]
					if(data) {
						self.addr = data.addr
						self.back_img = data.back_img
						self.car_body = data.car_body
						self.car_color = data.car_color
						self.car_ext_img = data.car_ext_img
						self.car_number = data.car_number
						self.carriage = data.carriage
						self.driving_licence_img = data.driving_licence_img
						self.first_img = data.first_img
						self.idcard = data.idcard
						self.linkman = data.linkman
						self.linkman_tel = data.linkman_tel
						self.mobile = data.mobile
						self.name = data.name
						self.relation = data.relation
						self.spec = data.spec
						self.type = data.type
						self.vehicle_license = data.vehicle_license
						self.vehicle_men = data.vehicle_men
						self.we_chat = data.we_chat
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
			goRegister(){
				uni.navigateTo({
					url: '/pages/register/register'
				});
			},
			jumpUpdate(){
				uni.navigateTo({
					url: '/pages/update/update'
				});
			}
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.show-nav {
		width: 100%;
	}
	.of-line {
		/* #ifdef H5 */
		margin-top: 1rem;
		/* #endif */
		width: 100%;
		font-size: 34upx;
	}
	.car-input {
		display: flex;
		margin: 0 1rem;
		border-bottom: 2upx solid #eaeaea;
		padding: 1rem 0;
	}
	.car-input input {
		padding-left: .5rem;
	}

	.upload-div-base {
		width: 160upx;
		height: 160upx;
		margin-left: 4rem;
		background: #f1f1f1;
		text-align: center;
		padding-top: 46upx !important;
	}
	.first-input-view {
		padding: 0 0 1rem 0 !important;
	}
	.car-upload-idcard {
		margin: 0 1rem;
		padding: 1rem 0;
		border-bottom: 2upx solid #eaeaea;
	}
	.last-input {
		border-bottom: none;
		margin-bottom: 2rem;
	}
	.push-btn {
		margin: 0 0 2rem 0;
		width: 100%;
		padding: 0 3rem;
	}
	.push-btn button {
		background: #ff5454;;
		color: #FFFFFF;
	}
	.img-cls-css view image {
		width: 100%;
		height: 9rem;
	}
	.car-input input {
		font-size: 28rpx;
	}
	.addr {
		width: 14rem;
	}
</style>
