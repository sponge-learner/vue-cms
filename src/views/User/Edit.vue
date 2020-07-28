<template>
	<div class="content_box">
		<span class="title">编辑用户</span>
		
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="ruleForm.username"></el-input>
			</el-form-item>
			<el-form-item label="昵称" prop="name">
				<el-input v-model="ruleForm.nickname"></el-input>
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
			

			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { User } from '@/api/index'
	export default {
		data() {
			return {
				ruleForm: {
					id: 0,
					username: '',
					nickname: '',
					sex: '',
					tel: '',
				},
				rules: {
					
				},
			};
		},
		created() {
			this.loading(this.$route.params.id)

		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						console.log(this.ruleForm);
						let { status, msg } = await User.edit(this.ruleForm.id, { ...this.ruleForm })
						if (!status) {return false}
						this.$message.success(msg);

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			async loading(id) {
				let { status, data } = await User.info({ id });
				if (!status) { return false }
				this.ruleForm = data;
				this.ruleForm.id = this.$route.params.id;

			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},

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
