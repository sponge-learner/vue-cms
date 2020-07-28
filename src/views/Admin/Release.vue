<template>
	<div>
		<tree @rightPush="rightPush()" @leftPush="leftPush()" :listLeft="listLeft" :listRight="listRight"></tree>
	</div>
</template>

<script>
	import tree from '@/components/Tree.vue'
	export default{
		components:{tree},
		data(){
			return{
				listLeft:[
					{id:1,name:'一',checked:false},
					{id:2,name:'二',checked:false},
					{id:3,name:'三',checked:false},
					
				],
				listRight:[
					{id:4,name:'四',checked:false},
					{id:5,name:'五',checked:false},
					{id:6,name:'六',checked:false},
				],
			}
		},
		
	
		}

</script>

<style>
</style>
