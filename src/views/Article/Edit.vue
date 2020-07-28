<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑文章</span>
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
							<el-select v-model="form.cate_1st" @change="handleCate_1stChange" placeholder="请选择文章一级分类">
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
						<el-button type="primary" @click="submitForm('form')">保存修改</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
	</div>
</template>

<script>
	//富文本编辑器
	import E from 'wangeditor';
	// import { Category } from '@/api/index';
	import { Article } from '@/api/index';
	import { Category } from '@/api/index';
	import Upload from '@/components/Upload.vue';
	export default {
		props: ['id'],
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
				ImageUrl: '',
				options_1st: [],
				options_2nd: []
			}
		},
		created() {
			this.loadSubcate(0).then((options) => this.options_1st = options);
			this.loadDetail(this.id);
		},

		async mounted() {
			//获取一级分类
			this.options_1st = await this.loadSubcate(0);
			//获取文章详情
			let article = await this.loadDetail(this.id);
			this.form = article;
			//获取二级分类
			this.options_2nd = await this.loadSubcate(article.cate_1st);

			var editor = new E(this.$refs.editor)
			editor.customConfig.onchange = (html) => {
				this.form.content = html;
			}
			editor.create()
			editor.txt.html(this.form.content)
			
		},
		methods: {
			//获取文章详情的信息
			async loadDetail(id) {
				let { status, data } = await Article.detail({ id });
				if (status) {
					return data;
				}

			},
			//根据传参获取下一级子分类
			async loadSubcate(id) {
				let { status, data } = await Category.subcate({ id });
				if (status) {
					return data;
				}
			},

			async handleCate_1stChange(val) {
				let options = await this.loadSubcate(val);
				this.options_2nd = options;
				this.form.cate_2nd = options[0].id;
			},
			handleUploadSuccess({data,msg,status}) {
				this.form.main_photo = data;
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
			},
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status,msg} = await Article.edit(this.form);
						if (status) {
							this.$router.push({path:'/Article/list'});
							this.$message.success(msg);
							this.$router.replace('/goods/list')
						}
					} else {
						this.$message.info('未提交成功!');
						return false;
					}
				});
			},
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
