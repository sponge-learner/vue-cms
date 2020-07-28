<template>
	<div style="width: 95%;margin: 0 auto;box-shadow: 0 0 4px 1px #ddd;padding: 0 20px;">
		<div>用户列表</div>
		<el-table :data="tableData">
			<el-table-column prop="id" label="#" width="30">
			</el-table-column>
			
			<el-table-column prop="nickname" label="昵称" width="200">
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="200">
			</el-table-column>
			<el-table-column prop="tel" label="手机" width="200">
			</el-table-column>

			<el-table-column label="操作" width="200">
				<template scope='scope'>
		1			<el-link :href="`#/User/edit/${scope.row.id}`">
						<el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
					</el-link>
					<el-button type="primary" icon="el-icon-delete" size="mini" style="margin-left: 10px;" @click='handledel(scope.$index,scope.row.id)'>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import { User } from '@/api/index';
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

				let { status, data } = await User.list();
				if (status) {
					// this.loading.close();

					this.tableData = data;

				}

			},
			async handledel(idx, id) {
				this.$confirm('此操作将永久该数据, 是否继续?', '提示', {
					type: 'warning'
				}).then(async () => {
					let { status, msg } = await User.del(id)
					if (status) {
						this.$message({ type: 'success', message: '删除成功!' });
						this.tableData.splice(idx, 1)
					}
				}).catch(() => {
					this.$message({ type: 'info', message: '已取消删除' });
				});
			}

		}
	}
</script>


<style>
</style>
