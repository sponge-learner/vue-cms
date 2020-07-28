<template>
	<div>
		
		<router-view></router-view>
	</div>

</template>

<script>
	export default {
		name: 'app',
	}
</script>

<style>
	

	a {
		text-decoration: none;
	}
	nav{
		padding:30px;
	}
	nav a{
		margin:0 30px;
	}
	nav a.current{
		color: orange;
		font-weight: bold;
	}
</style>