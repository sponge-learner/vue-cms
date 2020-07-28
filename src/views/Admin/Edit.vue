<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>编辑管理员</span>
		</div>
		<div class="text item">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
				<el-form-item label="手机号" prop="tel">
					<el-input v-model="ruleForm.tel"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="ruleForm.email"></el-input>
				</el-form-item>

				<el-form-item label="头像" prop="avatar">
					<upload :url='[ruleForm.avatar,"avatar"]' @success='handleUploadSuccess($event)' @remove='ruleForm.avatar=""'></upload>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
				</el-form-item>
			</el-form>
		</div>
	</el-card>
</template>

<script>
	import upload from '@/components/Upload.vue';
	import { Admin } from '@/api/index';

	export default {
		props: ['id'],
		components: {
			upload
		},
		data() {
			return {
				type: 'avatar',
				ruleForm: {
					username: '',
					fullname: '',
					tel: '',
					sex: '',
					email: '',
					avatar: ''
				},
				rules: {
					header: {
						// Au
					},
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 20,
							message: '长度在 3 到 20 个字符',
							trigger: 'blur'
						}
					],
					fullname: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 6,
							message: '长度在 2 到 6 个字符',
							trigger: 'blur'
						}
					],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],

				}
			};
		},
		created() {
			this.loadInfo(this.id);
		},
		watch: {
			'$route'(to, from) {
				let { id } = to.params;
				this.loadInfo(id);

			}
		},
		methods: {
			async loadInfo(id) {
				let { status, data } = await Admin.info({ id: id });
				if (status) {
					this.ruleForm = data;
					this.ruleForm.id = id;
				}
			},
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status, msg } = await Admin.edit(this.ruleForm);
						if (status) {
							this.$router.push({path:'/admin/list'});
							this.$message.success(msg);
						}
					} else {
						console.log('未提交成功!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},

			// 头像上传成功
			handleUploadSuccess({ starus, msg, data }) {
				this.ruleForm.avatar = data;
			}



			// handleAvatarSuccess(res, file, fileList) {
			// 	console.log(res, file, fileList);
			// 	if (res.status) {
			// 		this.ruleForm.avatar = res.data;
			// 	}

			// },
			// beforeAvatarUpload(file) {
			// 	const isJPG = file.type === 'image/jpeg';
			// 	const isLt2M = file.size / 1024 / 1024 < 2;

			// 	if (!isJPG) {
			// 		this.$message.error('上传头像图片只能是 JPG 格式!');
			// 	}
			// 	if (!isLt2M) {
			// 		this.$message.error('上传头像图片大小不能超过 2MB!');
			// 	}
			// 	return isJPG && isLt2M;
			// }
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
