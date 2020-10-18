<template>
	<view>
		<cu-custom class="show-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText"></block>
		    <block slot="content">修改密码</block>
		</cu-custom>
		<view class="pwd">
			<view class="login-number">
				<view class="d-name">登录号码</view>
				<view>{{mobile}}</view>
				<view class="home-message">
					<button @click="codeClick" v-if="changess">获取验证码</button>
					<button @click="codeClick" :disabled="disabled" v-else>{{this.second}}后重试</button>
				</view>
			</view>
			<view class="pwd-list">
				<view class="d-name">验证码</view>
				<view>
					<input type="text" v-model="code" placeholder="短信验证码"/>
				</view>
			</view>
			<view class="pwd-list">
				<view class="d-name">新密码</view>
				<view>
					<input type="password" v-model="newPwd" placeholder="输入新密码"/>
				</view>
			</view>
			<view class="pwd-list">
				<view class="d-name">确认密码</view>
				<view>
					<input type="password" v-model="newPwd1" placeholder="重新输入新密码"/>
				</view>
			</view>
			<view class="pwd-list-last">
				<text class="hint">* 密码格式为数字或者小写字母组成的6-10位的密码</text>
			</view>
			<view class="pwd-btn">
				<button type="default" @click="updatePwd()">保&nbsp;&nbsp;&nbsp;&nbsp;存</button>
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
				code:'',
				newPwd:'',
				newPwd1:''
			}
		},
		onLoad() {
			if(! uni.getStorageSync('tokenlo')) {
				uni.navigateTo({
					url: '/pages/index/index'
				});
			}
		},
		created() {
			let self = this;
			this.axios.request({
					url:'/api/user/get/user/data?time='+new Date().getTime(),
					method:'get',
					header:{
							  'Authorization':'Bearer '+uni.getStorageSync('tokenlo')
							},
				}).then(function({data}){
					if(data.data) {
						self.mobile = data.data.mobile
					}
				}).catch(err => {
					console.log(err)
				})
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
				           data:{mobile:this.mobile,type:1}
				       }).then(function({data}){
				           console.log(data)
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
			updatePwd(){
				if(!this.code) {
					uni.showModal({
					    title: '提示',
					    content: '验证码不能为空',
					    success: function (res) {}
					});
					return false;
				} else if(! this.newPwd) {
					uni.showModal({
					    title: '提示',
					    content: '密码不能为空',
					    success: function (res) {}
					});
					return false;
				}else if(this.newPwd.length <6) {
					uni.showModal({
					    title: '提示',
					    content: '密码长度不能少于6位',
					    success: function (res) {}
					});
					return false;
				} else if(this.newPwd !== this.newPwd1) {
					uni.showModal({
					    title: '提示',
					    content: '两次密码不相同',
					    success: function (res) {}
					});
					return false;
				} else {
					this.axios.request({
					        url:'/api/user/update/pwd',
					        method:'post',
							header:{
									  'Authorization':'Bearer '+uni.getStorageSync('tokenlo')
									},
					        data:{code:this.code,pwd:this.newPwd}
					    }).then(function({data}){
							if(data.code) {
								uni.showModal({
								    title: '提示',
								    content: '修改成功',
								    success: function (res) {
										localStorage.removeItem('tokenlo');
										uni.navigateTo({
											url: '/pages/index/index'
										});
									}
								});
							} else {
								uni.showModal({
								    title: '提示',
								    content: '修改失败',
								    success: function (res) {}
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
				}
				
			}
		}
	}
</script>

<style>
	page{
		background:#FFFFFF;
	}
	.show-nav {
		width: 100%;
	}
	.pwd {
		/* #ifdef H5 */
		margin-top: 1rem;
		/* #endif */
		width: 100%;
		font-size: 30upx;
		padding: 0 .5rem;
	}
	.login-number {
		display: flex;
		padding: 1rem 0 .5rem 0;
		line-height: 64upx;
		border-bottom: 2upx solid #efefef;
	}
	.home-message {
		margin-left: 3rem;
	}
	.home-message button {
		height: 1.8rem;
		font-size: 28upx;
		border: 1px solid #313131;
		background: #313131;
		color: #fff;
	}
	.d-name {
		width: 23%;
	}
	.pwd-list {
		display: flex;
		padding: .5rem 0 .5rem 0;
		border-bottom: 2upx solid #efefef;
	}
	.pwd-list-last {
		padding: .5rem 0 .5rem 0;
	}
	.hint {
		font-size: 24upx;
		color: #e54d42;
	}
	.pwd-btn {
		margin-top: 3rem;
		padding: 0 1rem;
	}
	.pwd-btn button {
		height: 37px;
		font-size: 15px;
		background:#b5b5b5;
		color: #FFFFFF;
	}
	
</style>
