<template>
	<el-menu default-active="2" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64"
	 text-color="#fff" active-text-color="#ffd04b" style="height: calc(100vh - 60px);">

		<el-submenu index="1">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span>文章管理</span>
			</template>
			<el-menu-item-group >
				<el-menu-item index="/article/release">发布文章</el-menu-item>
				<el-menu-item index="/article/list">文章列表</el-menu-item>
			</el-menu-item-group>
		</el-submenu> 

		<!-- <el-submenu index="2">
			<template slot="title">
				<i class="el-icon-data-line"></i>
				<span>分类管理</span>
			</template>
		</el-submenu> -->
		<el-menu-item index="/Category/list">
			<i class="el-icon-data-line"></i>
			<span slot="title">分类管理</span>
		</el-menu-item>
		<el-submenu index="3">
			<template slot="title">
				<i class="el-icon-user"></i>
				<span>用户管理</span>
			</template>
			<el-menu-item-group>
				
				<el-menu-item index="/user/list">
						用户列表
					
				</el-menu-item>
			</el-menu-item-group>
		</el-submenu>

		<el-submenu index="4">
			<template slot="title">
				<i class="el-icon-set-up"></i>
				<span>管理员管理</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="/admin/list">
						管理员列表
					
				</el-menu-item>

			</el-menu-item-group>
		</el-submenu>

		<el-submenu index="5">
			<template slot="title">
				<i class="el-icon-connection"></i>
				<span>权限管理</span>
			</template>
			<el-menu-item-group>
				
				<el-menu-item index="/power/list">权限列表</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-menu-item index="/user/account">
			<i class="el-icon-setting"></i>
				账户设置
		</el-menu-item>


	</el-menu>
</template>

<script>
	export default {
			methods: {
				handleOpen(key, keyPath) {
					console.log(key, keyPath);
				},
				handleClose(key, keyPath) {
					console.log(key, keyPath);
				}
			}
		}
	
</script>

<style>

</style>
