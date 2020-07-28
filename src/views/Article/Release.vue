<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>发布文章</span>
			</div>
			<div class="text item">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="标题">
						<el-input v-model="form.title"></el-input>
					</el-form-item>
					<el-form-item label="描述">
						<el-input v-model="form.description"></el-input>
					</el-form-item>
					<el-form-item label="分类">
						<el-col :span="6">
							<el-select v-model="form.cate_1st" placeholder="请选择文章一级分类">
								<el-option v-for="option in options_1st" :key='option.id' :label='option.name' :value="option.id"></el-option>
							</el-select>
						</el-col>
						<el-col :span="6">
							<el-select v-model="form.cate_2nd" placeholder="请选择文章二级分类">
								<!-- <el-option label="区域一" value="shanghai"></el-option> -->
								<el-option v-for="option in options_2nd" :key='option.id' :label='option.name' :value="option.id"></el-option>
							</el-select>
						</el-col>
					</el-form-item>
					<el-form-item label="主图">
						<Upload :url='[form.main_photo,"common"]' @success='handleUploadSuccess($event)' @remove='form.main_photo=""'></Upload>
					</el-form-item>
					<el-form-item label="内容">
						<div ref="editor"></div>
					</el-form-item>
					<el-form-item>
						<div class="btn">
							<el-button type="primary" @click='submitForm("form")'>发布</el-button>
							<el-button plain>取消</el-button>
						</div>
					</el-form-item>
				</el-form>

			</div>



		</el-card>
	</div>
</template>

<script>
	//富文本编辑器
	import E from 'wangeditor';
	import { Category } from '@/api/index';
	import Upload from '@/components/Upload.vue';
	import { Article } from '@/api/index';
	export default {
		components: {
			Upload,
		},
		data() {
			return {
				form: {
					title: '',
					description: '',
					cate_1st: '',
					cate_2nd: '',
					content: '',
					main_photo: '',
				},
				options_1st: [],
				options_2nd: []
			}
		},
		async created() {
			let options = await this.loadSubcate(0);
			this.options_1st = options;
		},
		watch: {
			'form.cate_1st': async function(val) {
				let options = await this.loadSubcate(val);
				this.options_2nd = options;
				this.form.cate_2nd = options[0].id;
			}
		},
		mounted() {
			//console.log(this.$refs.editor);
			// this.$refs.editor相当于js中的getElementById('editor')
			var editor = new E(this.$refs.editor)
			editor.customConfig.onchange = (html) => {
				this.form.content = html;
			}
			//配置图片上传
						// 配置服务器端地址
						editor.customConfig.uploadImgServer = '/upload/editor/';
						//配置自定义filename
						editor.customConfig.uploadFileName = 'file';
						//配置自定义header
						editor.customConfig.uploadImgHeaders = {
						    'Authorization': `Bearer ${sessionStorage.token}`
						};
			


			editor.create()
		},
		methods: {
			//根据传参获取下一级子分类
			async loadSubcate(id) {
				let { status, data } = await Category.subcate({ id });
				return data;
			},

			handleOptionChange(value) {
				this.loadSubcate(value).then((options) => {
					this.options_2nd = options;
					this.form.cate_2nd = options[0].id;
				});
			},
			//头像上传成功
			handleUploadSuccess({ data, msg, status }) {
				this.form.main_photo = data;
			},
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {

					if (valid) {
						let { status } = await Article.release(this.form);
						if (status) {
							this.$router.push({ path: '/article/list' });
							this.$message.success('提交成功!');
						}
					} else {
						this.$message.info('未提交成功!');
						return false;
					}
				});
			},
			//发布文章
			async handleRelease(form) {
				this.$refs[form].validate(async (valid) => {

					if (valid) {
						let { status } = await Article.release(this.form);
						if (status) {
							this.$message.success('提交成功!');
						}
					} else {
						this.$message.info('未提交成功!');
						return false;
					}
				});

			}
		}
	}
</script>

<style scoped>
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	/* .avatar-uploader .el-upload {
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
	} */
	.btn {
		text-align: center;
	}
</style>
