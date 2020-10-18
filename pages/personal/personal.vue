<template>
	<view>
		<cu-custom class="show-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText"></block>
		    <block slot="content">个人信息</block>
		</cu-custom>
		<view class="personal">
			<view class="personal-list">
				<view>手机号</view>
				<view><input type="text" v-model="mobile" style="direction: rtl;" /></view>
			</view>
			<view class="personal-list">
				<view>姓名</view>
				<view><input type="text" v-model="name" style="direction: rtl;" ></view>
			</view>
			<view class="personal-list">
				<view>年龄</view>
				<view><input type="text" v-model="age" style="direction: rtl;" ></view>
			</view>
			<view class="personal-list">
				<view>性别</view>
				<view>
					<view class="uni-form-item uni-column">
						<picker @change="bindPickerChange" :range="array">
							<label></label>
							<label class="">{{array[index]}}</label>
						</picker>
					</view>
				</view>
			</view>
			<view class="personal-list">
				<view>验证码</view>
				<view>
					<input type="text" v-model="age" style="direction: rtl;" >
					<view class="register">
						<view class="canvas-img-code" @click="refresh()">
						<canvas :style="{width:width+'px',height:height+'px'}" canvas-id="imgcanvas" @error="canvasIdErrorCallback"></canvas>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="update">
			<button type="default" @click="addMsg">修改信息</button>
			<button type="default" @click="jumpPwd">修改密码</button>
		</view>
		<view class="close">
			<button type="default" @click="loginOut">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				mobile:'',
				age:'',
				array:['男','女'],
				index:0,
				sex:'男',
				verCode: "", //验证码
				width: 120,
				height: 45
			}
		},
		onLoad() {
			if(! uni.getStorageSync('tokenlo')) {
				uni.navigateTo({
					url: '/pages/index/index'
				});
			}
		},
		onShow() {
			_this = this;
			setTimeout(function() {
				_this.init();
			}, 1000)
		},
		created() {
			self = this;
			let token = uni.getStorageSync('tokenlo')
			this.axios.request({
					url:'/api/user/get/user/data?time='+new Date().getTime(),
					method:'get',
					header:{
							  'Authorization':'Bearer '+token
							},
				}).then(function({data}){
					if(data.data) {
						self.name = data.data.name
						self.mobile = data.data.mobile
						self.age = data.data.age
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
			// 初始化验证码
					init: function() {
						console.log('start');
						var context = uni.createCanvasContext('imgcanvas', this),
							w = this.width,
							h = this.height;
						context.setFillStyle("white");
						context.setLineWidth(5);
						context.fillRect(0, 0, w, h);
						var pool = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "I", "M", "N", "O", "P", "Q", "R", "S",
								"T", "U", "V", "W", "S", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
							],
							str = '';
						for (var i = 0; i < 4; i++) {
							var c = pool[this.rn(0, pool.length - 1)];
							var deg = this.rn(-30, 30);
							context.setFontSize(18);
							context.setTextBaseline("top");
							context.setFillStyle(this.rc(80, 150));
							context.save();
							context.translate(30 * i + 15, parseInt(h / 1.5));
							context.rotate(deg * Math.PI / 180);
							context.fillText(c, -15 + 5, -15);
							context.restore();
							str += c;
						}
						uni.setStorage({
							key: 'imgcode',
							data: str,
						});
						for (var i = 0; i < 40; i++) {
							context.beginPath();
							context.arc(this.rn(0, w), this.rn(0, h), 1, 0, 2 * Math.PI);
							context.closePath();
							context.setFillStyle(this.rc(150, 200));
							context.fill();
						}
						context.draw();
						console.log('end');
					},
					rc: function(min, max) {
						var r = this.rn(min, max);
						var g = this.rn(min, max);
						var b = this.rn(min, max);
						return "rgb(" + r + "," + g + "," + b + ")";
					},
					rn: function(max, min) {
						return parseInt(Math.random() * (max - min)) + min;
					},
					refresh: function() {
						this.init();
					},
					canvasIdErrorCallback: function(e) {
						console.error(e.detail.errMsg)
					},
			
			
			
			
			jumpPwd(){
				uni.navigateTo({
					url: '/pages/pwd/pwd'
				});
			},
			loginOut() {
				this.axios.request({
						url:'/api/user/logout?time='+new Date().getTime(),
						method:'get',
						header:{
								  'Authorization':'Bearer '+uni.getStorageSync('tokenlo')
								}
					})
				uni.removeStorage({
					key:"tokenlo",
					success: function (res) {
					        uni.navigateTo({
					        	url: '/pages/index/index'
					        });
					    }
				});
			},
			//下拉框
			bindPickerChange(e) {
				this.index = e.target.value			
				this.jg=this.array[this.index]		
				this.sex = this.jg		
			},
			addMsg() {
				if(! this.name) {
					uni.showModal({
					    title: '提示',
					    content: '名字不能为空',
					    success: function (res) {}
					});
					return false;
				} else if(! this.age) {
					uni.showModal({
					    title: '提示',
					    content: '年龄不能为空',
					    success: function (res) {}
					});
					return false;
				} else if(isNaN(this.age)) {
					uni.showModal({
					    title: '提示',
					    content: '年龄为数字',
					    success: function (res) {}
					});
					return false;
				} else if(this.age >= 60) {
					uni.showModal({
					    title: '提示',
					    content: '年龄不合法',
					    success: function (res) {}
					});
					return false;
				} else {
					self = this;
					let token = uni.getStorageSync('tokenlo')
					this.axios.request({
							url:'/api/user/add/msg?time='+new Date().getTime(),
							method:'post',
							header:{
									  'Authorization':'Bearer '+token
									},
							data:{
								name:self.name,
								age:self.age,
								sex:self.sex
							}
						}).then(function({data}){
							if(data.data) {
								self.name = data.data.name
								self.mobile = data.data.mobile
								self.age = data.data.age
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
	page{
		background:#FFFFFF;
	}
	.show-nav {
		width: 100%;
	}
	.personal {
		/* #ifdef H5 */
		margin-top: 1rem;
		/* #endif */
		width: 100%;
		font-size: 30upx;
		padding: 0 1rem;
	}
	.personal-list {
		width: 100%;
		display: flex;
		justify-content:space-between;
		padding: .5rem 0;
		border-bottom: 1px solid #d4d4d4;
	}
	.personal-list:last-child {
		border: none;
	}
	.update {
		margin-top: 3rem;
		padding: 0 6%;
		display: flex;
		justify-content:space-between;
	}
	.update button {
		width: 40%;
	}
	.close {
		margin-top: 1rem;
		padding: 0 10%;
	}
	.update button {
		line-height: 1.8rem;
		font-size: 14px;
		background: #ff7575;
		color: #fff;
	}
	.close button {
		line-height: 1.8rem;
		font-size: 14px;
		background: #b5b5b5;
		color: #FFFFFF;
	}
</style>
