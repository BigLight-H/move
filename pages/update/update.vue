<template>
	<view class="content">
		<cu-custom class="show-nav" bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText"></block>
		    <block slot="content">司机信息</block>
		</cu-custom>
		<view class="of-line">
			<view class="car-upload-idcard">
				<view class="first-input-view">
					<text>身份证正面:</text>
				</view>
				<view class="img-hub">
					<view>
						<view class="img-hub-img" v-if="img1">
							<image :src="img1_url" mode=""></image>
						</view>
					</view>
					<view class="upload-div-base" type="primary" :loading="loading" :disabled="disabled" @click="upload(1)">
						<uni-icons type="camera-filled" size="34"></uni-icons>
					</view>
				</view>
			</view>
			<view class="car-upload-idcard">
				<view class="first-input-view">
					<text>身份证反面:</text>
				</view>
				<view class="img-hub">
					<view>
						<view class="img-hub-img" v-if="img2">
							<image :src="img2_url" mode=""></image>
						</view>
					</view>
					<view class="upload-div-base" type="primary" :loading="loading" :disabled="disabled" @click="upload(2)">
						<uni-icons type="camera-filled" size="34"></uni-icons>
					</view>
				</view>
			</view>
			<view class="car-upload-idcard">
				<view class="first-input-view">
					<text>行驶证:</text>
				</view>
				<view class="img-hub">
					<view>
						<view class="img-hub-img" v-if="img3">
							<image :src="img3_url" mode=""></image>
						</view>
					</view>
					<view class="upload-div-base" type="primary" :loading="loading" :disabled="disabled" @click="upload(3)">
						<uni-icons type="camera-filled" size="34"></uni-icons>
					</view>
				</view>
			</view>
			<view class="car-upload-idcard">
				<view class="first-input-view">
					<text>驾驶证:</text>
				</view>
				<view class="img-hub">
					<view>
						<view class="img-hub-img" v-if="img4">
							<image :src="img4_url" mode=""></image>
						</view>
					</view>
					<view class="upload-div-base" type="primary" :loading="loading" :disabled="disabled" @click="upload(4)">
						<uni-icons type="camera-filled" size="34"></uni-icons>
					</view>
				</view>
			</view>
			<view class="car-upload-idcard">
				<view class="first-input-view">
					<text>行驶证所有人照片:</text>
				</view>
				<view class="img-hub">
					<view>
						<view class="img-hub-img" v-if="img5">
							<image :src="img5_url" mode=""></image>
						</view>
					</view>
					<view class="upload-div-base" type="primary" :loading="loading" :disabled="disabled" @click="upload(5)">
						<uni-icons type="camera-filled" size="34"></uni-icons>
					</view>
				</view>
			</view>
			<view class="car-upload-idcard">
				<view class="first-input-view">
					<text>车辆45度照片:</text>
				</view>
				<view class="img-hub">
					<view>
						<view class="img-hub-img" v-if="img6">
							<image :src="img6_url" mode=""></image>
						</view>
					</view>
					<view class="upload-div-base" type="primary" :loading="loading" :disabled="disabled" @click="upload(6)">
						<uni-icons type="camera-filled" size="34"></uni-icons>
					</view>
				</view>
			</view>
			<view class="car-input">
				<text>姓名:</text><input type="text" v-model="name">
			</view>
			<view class="car-input">
				<text>手机号:</text><input type="text" v-model="mobile">
			</view>
			<view class="car-input">
				<text>微信号:</text><input type="text" v-model="wecaht">
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
				<text>联系人现居地:</text>
				  <input type="text" @tap="handleTap('picker3')" v-model="label3">
				<lb-picker ref="picker3"
				  v-model="value3"
				  mode="multiSelector"
				  :list="list1"
				  :level="3"
				  :dataset="{ name: 'label3' }"
				  @change="handleChange"
				  @confirm="handleConfirm"
				  @cancel="handleCancel">
				</lb-picker>
			</view>
			<view class="car-input">
				<text>车辆类型:</text><input type="text" @tap="handleTap('picker6')" v-model="label2">
				<lb-picker ref="picker6"
				  v-model="value6"
				  mode="multiSelector"
				  :list="list3"
				  :level="1"
				  :dataset="{ name: 'label2' }"
				  @change="handleChange"
				  @confirm="handleConfirm"
				  @cancel="handleCancel">
				</lb-picker>
			</view>
			<view class="car-input">
				<text>车牌号:</text><input type="text" v-model="car_number">
			</view>
			<view class="car-input">
				<text>车牌颜色:</text><input type="text" v-model="car_color">
			</view>
			<view class="car-input">
				<text>车辆规格:</text><input type="text" @tap="handleTap('picker5')" v-model="label1">
				<lb-picker ref="picker5"
				  v-model="value5"
				  mode="multiSelector"
				  :list="list2"
				  :level="1"
				  :dataset="{ name: 'label1' }"
				  @change="handleChange"
				  @confirm="handleConfirm"
				  @cancel="handleCancel">
				</lb-picker>
			</view>
			<view class="car-input">
				<text>车厢:</text><input type="text" v-model="car_riage_len">
			</view>
			<view class="car-input last-input">
				<text>车身:</text><input type="text" v-model="car_body_len">
			</view>
		</view>
		<view class="push-btn">
			<button type="default" @tap="pushCarMsg()">确认提交</button>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import LbPicker from '@/components/lb-picker'
	import areaData from '../area-data-min.js'
	export default {
		components: {
			uniIcons,
			LbPicker
		},
		data() {
			return {
			  percent:0,
			  loading:false,
			  disabled:false,
			  img1:false,
			  img2:false,
			  img3:false,
			  img4:false,
			  img5:false,
			  img6:false,
			  img1_url:'',
			  img2_url:'',
			  img3_url:'',
			  img4_url:'',
			  img5_url:'',
			  img6_url:'',
			  value1: [],
			  label1: '',
			  
			  value2: [],
			  label2: '',
			  
			  value3: [],
			  label3: '',
			  
			  value5: [],
			  
			  value6: [],
			  
			  list1: areaData,
			  list2: [],
			  list3: [],
			  name:'',
			  mobile:'',
			  wecaht:'',
			  idcard:'',
			  linkman:'',
			  linkman_tel:'',
			  relation:'',
			  car_number:'',
			  car_color:'',
			  car_riage_len:'',
			  car_body_len:''
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
			        url:'/api/user/get/type/spec?time='+new Date().getTime(),
			        method:'get',
					header:{
							  'Authorization':'Bearer '+uni.getStorageSync('tokenlo')
							},
			    }).then(function({data}){
					self.list2 = data.data.spec
					self.list3 = data.data.type
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
						self.label3 = data.addr
						self.img2_url = data.back_img
						self.car_body_len = data.car_body
						self.car_color = data.car_color
						self.img6_url = data.car_ext_img
						self.car_number = data.car_number
						self.car_riage_len = data.carriage
						self.img4_url = data.driving_licence_img
						self.img1_url = data.first_img
						self.idcard = data.idcard
						self.linkman = data.linkman
						self.linkman_tel = data.linkman_tel
						self.mobile = data.mobile
						self.name = data.name
						self.relation = data.relation
						self.label1 = data.spec
						self.label2 = data.type
						self.img3_url = data.vehicle_license
						self.img5_url = data.vehicle_men
						self.wecaht = data.we_chat
						self.img1 = true
						self.img2 = true
						self.img3 = true
						self.img4 = true
						self.img5 = true
						self.img6 = true
					}
			    }).catch(err => {
			        console.log(err)
			    })
		},
		methods: {
			goRegister(){
				uni.navigateTo({
					url: '/pages/register/register'
				});
			},
			pushCarMsg(){
				let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				let mreg = /^1[3456789]\d{9}$/;
				let regExp = /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$)/;
				
				if(! this.img1_url) {
					uni.showModal({
					    title: '提示',
					    content: '身份证正面不能为空',
					    success: function (res) {}
					});
					return false;
				} else if(! this.img2_url) {
					uni.showModal({
					    title: '提示',
					    content: '身份证反面不能为空',
					    success: function (res) {}
					});
					return false;
				} else if(! this.img3_url) {
					uni.showModal({
					    title: '提示',
					    content: '行驶证不能为空',
					    success: function (res) {}
					});
					return false;
				} else if(! this.img4_url) {
					uni.showModal({
					    title: '提示',
					    content: '驾驶证不能为空',
					    success: function (res) {}
					});
					return false;
				} else if(! this.img5_url) {
					uni.showModal({
					    title: '提示',
					    content: '行驶证所有人不能为空',
					    success: function (res) {}
					});
					return false;
				} else if(! this.img6_url) {
					uni.showModal({
					    title: '提示',
					    content: '车辆照片不能为空',
					    success: function (res) {}
					});
					return false;
				} else if(! this.name) {
					uni.showModal({
					    title: '提示',
					    content: '照片不能为空',
					    success: function (res) {}
					});
					return false;
				} else if(!mreg.test(this.mobile)) {
					uni.showModal({
					    title: '提示',
					    content: '手机号格式错误',
					    success: function (res) {}
					});
					return false;
				} else if(! this.wecaht) {
					uni.showModal({
					    title: '提示',
					    content: '微信号不能为空',
					    success: function (res) {}
					});
					return false;
				} else if(!reg.test(this.idcard)) {
					uni.showModal({
					    title: '提示',
					    content: '身份证格式错误',
					    success: function (res) {}
					});
					return false;
				} else if(! this.linkman) {
					uni.showModal({
					    title: '提示',
					    content: '紧急联系人不能为空',
					    success: function (res) {}
					});
					return false;
				} else if(!mreg.test(this.linkman_tel)) {
					uni.showModal({
					    title: '提示',
					    content: '手机号格式错误',
					    success: function (res) {}
					});
					return false;
				} else if(! this.relation) {
					uni.showModal({
					    title: '提示',
					    content: '联系人关系不能为空',
					    success: function (res) {}
					});
					return false;
				} else if(!regExp.test(this.car_number)) {
					uni.showModal({
					    title: '提示',
					    content: '车牌号格式错误',
					    success: function (res) {}
					});
					return false;
				} else if(! this.car_color) {
					uni.showModal({
					    title: '提示',
					    content: '车颜色不能为空',
					    success: function (res) {}
					});
					return false;
				} else if(! this.car_color) {
					uni.showModal({
					    title: '提示',
					    content: '车颜色不能为空',
					    success: function (res) {}
					});
					return false;
				} else if(! this.car_riage_len) {
					uni.showModal({
					    title: '提示',
					    content: '车厢高度不能为空',
					    success: function (res) {}
					});
					return false;
				} else if(! this.label1) {
					uni.showModal({
					    title: '提示',
					    content: '车辆规格不能为空',
					    success: function (res) {}
					});
					return false;
				} else if(! this.label2) {
					uni.showModal({
					    title: '提示',
					    content: '车辆类型不能为空',
					    success: function (res) {}
					});
					return false;
				} else if(! this.car_body_len) {
					uni.showModal({
					    title: '提示',
					    content: '车身长度不能为空',
					    success: function (res) {}
					});
					return false;
				} else if(! this.car_body_len) {
					uni.showModal({
					    title: '提示',
					    content: '车身长度不能为空',
					    success: function (res) {}
					});
					return false;
				} else if(! this.label3) {
					uni.showModal({
					    title: '提示',
					    content: '现居地不能为空',
					    success: function (res) {}
					});
					return false;
				} else {
					this.axios.request({
					        url:'/api/user/save/car/msg?time='+new Date().getTime(),
					        method:'post',
							header:{
									  'Authorization':'Bearer '+uni.getStorageSync('tokenlo')
									},
							data:{
								name:this.name,
								mobile:this.mobile,
								wecaht:this.wecaht,
								idcard:this.idcard,
								linkman:this.linkman,
								linkman_tel:this.linkman_tel,
								relation:this.relation,
								car_number:this.car_number,
								car_color:this.car_color,
								car_riage_len:this.car_riage_len,
								car_body_len:this.car_body_len,
								type:this.label2,
								spec:this.label1,
								addr:this.label3,
								id:uni.getStorageSync('carId')
							}
					    }).then(function({data}){
							if(data.message=='success') {
								uni.showModal({
								    title: '提示',
								    content: '添加成功,等待审核',
								    success: function (res) {
								        if (res.confirm) {
								            uni.navigateTo({
								            	url: '/pages/transit/transit'
								            });
								        } else if (res.cancel) {
								            console.log('用户点击取消');
								        }
								    }
								});
							}
					    }).catch(err => {
					        console.log(err)
					    })
				}
			},
			upload(id){
				let _self = this;
			   uni.chooseImage({
			    count: 1,
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			    success: function (res) {
			     const tempFilePaths = res.tempFilePaths;
			     const uploadTask = uni.uploadFile({
			      url : 'http://tchy.01vk.com/api/user/save/img',
				  method:'post',
				  header:{
				  		  'Authorization':'Bearer '+uni.getStorageSync('tokenlo')
				  		},
			      filePath: tempFilePaths[0],
			      name: 'file',
			      formData: {
			       'type': id,
				   'id':uni.getStorageSync('carId')
			      },
			      success: function (uploadFileRes) {
					  let data = JSON.parse(uploadFileRes.data);
					  console.log(id);
					  if(data.code) {
						  console.log(data.data.id)
						  switch(data.data.id) {
							  case '1':
							  _self.img1 = true
							  _self.img1_url = 'http://'+data.data.images;
							  break;
							  case '2':
							  _self.img2 = true
							  _self.img2_url = 'http://'+data.data.images;
							  break;
							  case '3':
							  _self.img3 = true
							  _self.img3_url = 'http://'+data.data.images;
							  break;
							  case '4':
							  _self.img4 = true
							  _self.img4_url = 'http://'+data.data.images;
							  break;
							  case '5':
							  _self.img5 = true
							  _self.img5_url = 'http://'+data.data.images;
							  break;
							  case '6':
							  _self.img6 = true
							  _self.img6_url = 'http://'+data.data.images;
							  break;
						  }
						  
					  }
			       
			      }
			     });
			    },
			    error : function(e){
			     console.log(e);
			    }
			   });
			  },
			  
			  handleTap (picker) {
			    this.$refs[picker].show()
			  },
			  handleChange (e) {
			    console.log('change::', e)
			  },
			  handleConfirm (e) {
			    // 如果存在多个picker，可以在picker上设置dataset属性，confirm中获取，就能区分是哪个picker了
			    console.log('confirm::', e)
			    if (e) {
			      const name = e.dataset.name
			      const label = e.item.map(m => m.label).join('-')
			      if (name && label) {
			        this[name] = label
			      }
			    }
			  },
			  handleCancel (e) {
			    console.log('cancel::', e)
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
		min-width: 65%;
	}

	.upload-div-base {
		width: 160upx;
		height: 160upx;
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
	.img-hub {
		display: flex;
	}
	.img-hub-img image {
		height: 4rem;
		width: 8rem;
		margin-right: 1rem;
	}
</style>
