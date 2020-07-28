<template>
	<div>

		<el-card class="box-card">
			<div>文章列表</div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column label="#" prop="id" type="index" width="50">
				</el-table-column>
				<el-table-column property="geogory1" prop="cate_1st_name" label="一级分类">
				</el-table-column>
				<el-table-column property="geogory2" prop="cate_2nd_name" label="二级分类">
				</el-table-column>
				<el-table-column label="主图" prop="main_photo">
					<template scope="scope">
						<img :src="scope.row.main_photo" height="80" width="100" class="head_pic" />
					</template>
				</el-table-column>
				<el-table-column property="title" label="标题" prop="title">
				</el-table-column>
				<el-table-column property="release" label="发布日期" prop="create_time">
				</el-table-column>
				<el-table-column property="update" label="更新日期" prop="update_time">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-link :href="`#/article/edit/${scope.row.id}`" class="am-margin-right-sm">
							<el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
						</el-link>
						<el-button type="primary" icon="el-icon-delete" size="mini" @click='handledel(scope.row.id,scope.$index)'>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
	import { Article } from '@/api/index';
	export default {
		data() {
			return {
				tableData: [],

			}
		},
		created() {
			// this.loading = this.$loading();

			//获取列表数据
			this.loadList();
		},
		methods: {
			
			//加载列表数据
			async loadList() {

				let { status, total, data } = await Article.list({ pagesize: 10, pageindex: 1 });
				if (status) {
					// this.loading.close();

					this.tableData = data;
				}

			},
			async handledel(id, index) {
				let { status, msg } = await Admin.del({ id });
				if (status) {
					this.tableData.splice(index, 1);
					this.$message.success(msg);
				}
			}
		}
	}
</script>

<style>
</style>
