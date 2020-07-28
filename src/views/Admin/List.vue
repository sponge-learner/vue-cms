<template>
	<div class="content_box">
		<span class="title">管理员列表</span>

		<el-table :data="tableData">
			<el-table-column prop="id" label="#" width="30">
			</el-table-column>
			<el-table-column prop="username" label="用户名" width="100">
			</el-table-column>
			<el-table-column prop="fullname" label="姓名" width="100">
			</el-table-column>


			<el-table-column prop="sex" label="性别" width="180">
			</el-table-column>
			<el-table-column prop="tel" label="手机" width="200">
			</el-table-column>
			<el-table-column prop="email" label="邮箱" width="200">
			</el-table-column>
			<el-table-column label="主图" width="150">
				<template scope="scope">
					<img :src="scope.row.avatar" width="100" height="100" class="head_pic" />
				</template>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-link :href="`#/admin/edit/${scope.row.id}`" class="am-margin-right-sm">
						<el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
					</el-link>
					<el-button type="primary" icon="el-icon-delete" size="mini" @click='handledel(scope.row.id,scope.$index)'>删除</el-button>
				</template>
			</el-table-column>
		</el-table>

	</div>
</template>

<script>
	import { Admin } from '@/api/index';
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

				let { status, total, data } = await Admin.list({ pagesize: 10, pageindex: 1 });
				if (status) {
					// this.loading.close();

					this.tableData = data;
					// data.forEach(function(item) {
					// 	item.avatar = 'http://localhost:3001/' + item.avatar.replace('../', '');
					// })
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
