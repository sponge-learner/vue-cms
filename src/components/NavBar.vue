<template>
	<div class="NavBar">
		<img src="../assets/img/logo.png" width="15%" alt="">
		<el-dropdown size="small" split-button >
			赵薇
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item>个人中心</el-dropdown-item>
				<el-dropdown-item>投诉反馈</el-dropdown-item>
				<el-dropdown-item>关于我们</el-dropdown-item>
				<el-dropdown-item>退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>

	</div>
</template>

<script>
</script>

<style>
	.NavBar {
		background-color: black;
		color: white;
		height: 60px;
		line-height: 60px;
		display: flex;
		padding: 0 20PX;
		justify-content: space-between;
	}
</style>
