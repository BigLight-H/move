<template>
	<view class="content">
		<image class="logo" src="http://tchy.01vk.com/storage/red72.png"></image>
		<view class="home-class">
			<view class="home-input">
				<input type="text" v-model="mobile" placeholder="请输入手机号"/>
				<input type="password" v-model="password" placeholder="请输入密码"/>
				<view class="home-message">
					<input type="text" v-model="code" placeholder="短信验证码"/>
					<button @click="codeClick" v-if="changess">获取验证码</button>
					<button @click="codeClick" :disabled="disabled" v-else>{{this.second}}后重试</button>
				</view>
			</view>
			<view class="home-btn">
				<button type="default" @click="goHome" >登&nbsp;&nbsp;&nbsp;&nbsp;陆</button>
			</view>
			<view class="home-res">
				<text>还没有账号?</text>
				<text @click="goRegister">立即注册</text>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				showText:true,
				second:59,
				disabled:false,
				changess:true,
				mobile: '',
				password:'',
				code:''
			}
		},
		onLoad() {
			let token = uni.getStorageSync('tokenlo')
			if(token) {
				uni.navigateTo({
					url: '/pages/transit/transit'
				});
			}
		},
		methods: {
			codeClick(){
				
					if(this.checkMobile(this.mobile)) {
						this.axios.request({
						       url:'/api/get/sms/code',
						       method:'post',
						       data:{mobile:this.mobile,type:1}
						   }).then(function({data}){
						       if(data.code == 0){
								   uni.showModal({
								       title: '提示',
								       content: data.data,
								       success: function (res) {
								       }
								   });
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
						   
						   this.changess = false;
						   this.disabled = true
						   this.showText = false
						   
						   var interval = setInterval(() => {
						   					  --this.second
						   }, 1000)
						   
						   setTimeout(() => {
						   					  clearInterval(interval)
						   					  this.showText = true
						   					  this.second = 59
						   					  this.disabled = false
						   					  this.changess = true;
						   }, 60000)
						   
					} else {
						uni.showModal({
						    title: '提示',
						    content: '手机号码格式错误',
						    success: function (res) {
						    }
						});
					}
				   
				   
			},
			goRegister(){
				uni.navigateTo({
					url: '/pages/register/register'
				});
			},
			checkMobile(mobile){
			    return RegExp(/^1[34578]\d{9}$/).test(mobile);
			},
			goHome(){
				if(! this.mobile) {
					uni.showModal({
					    title: '提示',
					    content: '手机号码不能为空',
					    success: function (res) {
					    }
					});
					return false;
				} else if(! this.password) {
					uni.showModal({
					    title: '提示',
					    content: '密码不能为空',
					    success: function (res) {
					    }
					});
					return false;
				} else if(! this.code) {
					uni.showModal({
					    title: '提示',
					    content: '验证码不能为空',
					    success: function (res) {
					    }
					});
					return false;
				} else {
					this.axios.request({
					        url:'/api/user/login',
					        method:'post',
					        data:{mobile:this.mobile,password:this.password,code:this.code}
					    }).then(function({data}){
							if(data.message !== 'success') {
								uni.showModal({
								    title: '提示',
								    content: data.message,
								    success: function (res) {
								    }
								});
							} else {
								if(data.data.token_data.access_token){
									uni.setStorage({
										key:"tokenlo",
										data:data.data.token_data.access_token
									})
									uni.setStorage({
										key:"uuid",
										data:data.data.uuid
									})
									uni.reLaunch({
										url: '/pages/transit/transit'
									});
								}
							}
					        console.log(data)
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
				}
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
		border-radius: 40rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.home-class {
		margin-top: 10%;
		width: 70%;
	}
	.home-input input {
		border:.04rem solid #CCCCCC;
		margin-bottom: 1rem;
		border-radius: 10rpx;
		padding-left: 8rpx;
		height: 1.5rem;
	}
	.home-message {
		display: flex;
		justify-content:space-between;
	}
	.home-message button {
		font-size: 24rpx;
		height: 1.5rem;
		width: 35%;
	}
	.home-message input {
		width: 60%;
	}
	.home-btn button {
		height: 1.7rem;
		font-size: 28upx;
	}
	.home-res {
		margin-top: 1rem;
		text-align: center;
	}
	.home-res text:first-child {
		margin-right: 1rem;
	}
	.home-res text:last-child {
		color: #0081FF;
	}
</style>
