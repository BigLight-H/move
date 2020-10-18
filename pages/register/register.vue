<template>
	<view class="content">
		<image class="logo" src="http://tchy.01vk.com/storage/red72.png"></image>
		<view class="home-class">
			<view class="home-input">
				<input type="text" v-model="mobile" placeholder="输入手机号"/>
				<input type="password" v-model="pwd" placeholder="输入密码"/>
				<input type="password" v-model="pwd1" placeholder="确认密码"/>
				<view class="home-message">
					<input type="text" v-model="code" placeholder="短信验证码"/>
					<button @click="codeClick" v-if="changess">获取验证码</button>
					<button @click="codeClick" :disabled="disabled" v-else>{{this.second}}后重试</button>
				</view>
			</view>
			<view class="home-btn">
				<button type="default" @click="goRegister()">注&nbsp;&nbsp;&nbsp;&nbsp;册</button>
			</view>
			<view class="home-deal">
				<text>注册即表示同意</text>
				<text>《用户协议》</text>
			</view>
			<view class="home-res">
				<text>已有账号?</text>
				<text @click="goLogin">立即登陆</text>
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
				mobile:'',
				pwd:'',
				pwd1:'',
				code:''
			}
		},
		onLoad() {

		},
		methods: {
			codeClick(){
				this.changess = false;
				this.disabled = true
				// console.log("1")
				   this.showText = false
				   var interval = setInterval(() => {
					  --this.second
				   }, 1000)
				   this.axios.request({
				           url:'/api/get/sms/code',
				           method:'post',
				           data:{mobile:this.mobile,type:2}
				       }).then(function({data}){
						   console.log(data.code)
				           if(!data.code) {
							   uni.showModal({
							       title: '提示',
							       content: data.data,
							       success: function (res) {
							       }
							   });
						   }
				       }).catch(err => {
				           console.log(err)
				       })
				   setTimeout(() => {
					  clearInterval(interval)
					  this.showText = true
					  this.second = 59
					  this.disabled = false
					  this.changess = true;
				   }, 60000)
			},
			goLogin(){
				uni.navigateTo({
					url: '/pages/index/index'
				});
			},
			goRegister() {
				if(!this.mobile){
					uni.showModal({
					    title: '提示',
					    content: '手机号码不能为空',
					    success: function (res) {
					    }
					});
					return false;
				}else if(! this.pwd) {
					uni.showModal({
					    title: '提示',
					    content: '密码不能为空',
					    success: function (res) {
					    }
					});
					return false;
				}else if(this.pwd !== this.pwd1) {
					uni.showModal({
					    title: '提示',
					    content: '两次密码不一致',
					    success: function (res) {
					    }
					});
					return false;
				}else if(!this.code) {
					uni.showModal({
					    title: '提示',
					    content: '验证码不能为空',
					    success: function (res) {
					    }
					});
					return false;
				}else if(this.code.length != 4) {
					uni.showModal({
					    title: '提示',
					    content: '验证码格式错误',
					    success: function (res) {
					    }
					});
					return false;
				} else {
					this.axios.request({
					        url:'/api/user/register',
					        method:'post',
					        data:{mobile:this.mobile,pwd:this.pwd,code:this.code}
					    }).then(function({data}){
							if(data.code) {
								uni.showModal({
								    title: '提示',
								    content: '注册成功!',
								    success: function (res) {
								        uni.navigateTo({
								        	url: '/pages/index/index'
								        });
								    }
								});
							} else {
								uni.showModal({
								    title: '提示',
								    content: '注册失败',
								    success: function (res) {
								    }
								});
							}
					    }).catch(err => {
					        console.log(err)
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
		margin-top: 6%;
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
	.home-deal {
		text-align: center;
		margin-top: 1rem;
		font-size: 24upx;
	}
	.home-deal text:last-child {
		color: #0081FF;
	}
</style>
