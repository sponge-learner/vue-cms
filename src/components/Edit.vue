<template>
	<div class="shadow">
		<span class="tbl_header">编辑管理员</span>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="admin_form demo-ruleForm">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="ruleForm.username"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="fullname">
				<el-input v-model="ruleForm.fullname"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-radio-group v-model="ruleForm.sex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="手机" prop="tel">
				<el-input v-model="ruleForm.tel"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="ruleForm.email"></el-input>
			</el-form-item>
			<el-form-item label="头像" prop="avatar">
				<upload @remove="ruleForm.avatar = ''" @success="transmission($event)" :url="ruleForm.avatar"></upload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { Admin,Upload } from '@/api/index'
	import upload from '@/components/Upload.vue'
	export default {
		components:{
			upload
		},
		data() {
			var checkPhone = (rule, value, callback) => {
				const phoneReg = /^1[34578]\d{9}$$/
				if (!value) {
					return callback(new Error('电话号码不能为空'))
				}
				setTimeout(() => {
					// Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
					// 所以在前面加了一个+实现隐式转换

					if (!Number.isInteger(+value)) {
						callback(new Error('请输入数字值'))
					} else {
						if (phoneReg.test(value)) {
							callback()
						} else {
							callback(new Error('电话号码格式不正确'))
						}
					}
				}, 100)
			};
			return {
				ruleForm: {
					id:'',
					username: '',
					fullname: '',
					sex: '',
					email: '',
					tel: '',
					avatar: ''
				},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 5,
							message: '长度在 2 到 5 个字符',
							trigger: 'blur'
						}
					],
					fullname: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 5,
							message: '长度在 2 到 5 个字符',
							trigger: 'blur'
						}
					],
					email: [{
							required: true,
							message: '请输入邮箱地址',
							trigger: 'blur'
						},
						{
							type: 'email',
							message: '请输入正确的邮箱地址',
							trigger: ['blur', 'change'],
						}
					],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					tel: [{
						required: true,
						validator: checkPhone,
						trigger: 'blur'
					}],
					avatar:[{
						required: true,
						message: '请上传头像',
						trigger: 'blur'
					}]
				},
			}
		},
		created() {
			this.loadUser(this.$route.params.id);
		},
		methods: {
			async loadUser(id){
				let {status,data} = await Admin.info({id:id});
				if(status){
					this.ruleForm = data;
					this.ruleForm.id = id;
				}
			},
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let {status} = await Admin.update({...this.ruleForm});
						if(status){
							this.$router.push('/admin/list');
							this.$message.success("数据修改成功");
						}else{
							this.$message.error("数据修改失败");
						}
					}
				});
			},
			// 头像上传成功修改数据
			transmission({status,msg,data}){ // 直接 解构 传回来的数据
				this.ruleForm.avatar = data;
			},
		}
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
