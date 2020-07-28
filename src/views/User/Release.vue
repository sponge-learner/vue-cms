<template>
	<div class="content_box">
		<span class="title">权限管理</span>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="fullname">
				<el-input v-model="ruleForm.fullname"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="角色">
			    <el-select v-model="ruleForm.role" placeholder="请选择角色">
			      <el-option label="管理员" value="guanliyuan"></el-option>
			      <el-option label="用户" value="yonghu"></el-option>
			    </el-select>
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
			<el-form-item label="头像" prop="pic">
				<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
				 :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				ruleForm: {
					fullname: 'admin1',
					name: '张三',
					sex: '男',
					tel: '183*****6655',
					email: '992133***',
					pic: '',
					role:''
				},
				rules: {
					fullname: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 6,
							message: '长度在 1 到 6 个字符',
							trigger: 'blur'
						}
					],
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'change'
					}],
					sex: [{
						type: 'date',
						required: true,
						message: '请输入性别',
						trigger: 'change'
					}],
					tel: [{
						type: 'date',
						required: true,
						message: '请选择手机号',
						trigger: 'change'
					}],
					type: [{
						type: 'array',
						required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change'
					}],
					email: [{
						required: true,
						message: '请输入邮箱号',
						trigger: 'change'
					}],
					pic: [{
						required: true,
						message: '请上传头像',
						trigger: 'blur'
					}],
					role: [{
						required: true,
						message: '请选择用户名',
						trigger: 'change'
					}]
				},
				imageUrl: ''
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			}
		}
	}
</script>

<style>
	.demo-ruleForm {
		padding: 10px 0;
	}

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

	.content_box {
		box-shadow: 0 0 4px 1px #ddd;
		padding: 0 20px;
	}

	.title {
		display: block;
		padding: 10px 0;
		position: relative;
	}

	.title::after {
		content: '';
		position: absolute;
		width: 103%;
		height: 1px;
		background-color: #ddd;
		bottom: 0;
		left: -20px;
	}
</style>