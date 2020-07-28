<template>
	<div class="box">
		<div class="left">
			<form action="">
				<div class="top">
					<label><input v-model="checkedAllLeft" type="checkbox">列表一</label>
				</div>
				<div class="btm">
					<label v-for="(item,index) in listLeft"><input :key="item.id" v-model="item.checked" type="checkbox">{{item.name}}</label>
				</div>
			</form>
		</div>
		<div class="mid">
			<el-button  @click="$emit('leftPush')" :disabled="isRightChecked" size="medium" icon="el-icon-arrow-left" type="primary"></el-button>
			<el-button @click="$emit('rightPush')" :disabled="isLeftChecked" size="medium" icon="el-icon-arrow-right" type="primary"></el-button>
		</div>
		<div class="right left">
			<div class="top">
				<label><input v-model="checkedAllRight" type="checkbox">列表2</label>
			</div>
			<div class="btm">
				<label v-for="(item,index) in listRight"><input :key="item.id" v-model="item.checked" type="checkbox">{{item.name}}</label>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:['listLeft','listRight'],
		data(){
			return{
				isLeftChecked:true,
				isRightChecked:true
			}
		},
		computed:{
			//左全选
			checkedAllLeft:{
				get(){
					var num = 0;
					this.listLeft.forEach((item,index)=>{
						if(item.checked){
							num++;
						}
					})
					
					if(num != 0){
						this.isLeftChecked =false;
					}else{
						this.isLeftChecked =true;
					}
					
					return num == this.listLeft.length;
				},
				set(newValue){
					this.listLeft.forEach((item)=>{
						item.checked = newValue;
					})
				}
			},
			methods:{
			leftPush(){
				for(let i=0;i<this.listRight.length;i++){
					let list = this.listRight[i];
					if(list.checked){
						this.listRight[i].checked = false;
						this.listRight.splice(i,1);
						this.listLeft.push(list);
						i=i-1;
					}
				}
			},
			rightPush(){
				for(let i=0;i<this.listLeft.length;i++){
					let list = this.listLeft[i];
					if(list.checked){
						list.checked = false;
						this.listLeft.splice(i,1);
						this.listRight.push(list);
						i=i-1;
					}
				}
				}
			},
			
			//右全选
			checkedAllRight:{
				get(){
					var num = 0;
					this.listRight.forEach((item,index)=>{
						if(item.checked){
							num++;
						}
					})
					
					if(num != 0){
						this.isRightChecked =false;
					}else{
						this.isRightChecked =true;
					}
					
					return num == this.listRight.length;
				},
				set(newValue){
					this.listRight.forEach((item)=>{
						item.checked = newValue;
					})
				}
			},
		},
	}
</script>

<style scoped="scoped">
	.box{
		display: flex;
		justify-content: space-between;
		width: 700px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.left{
		width: 200px;
		border: 1px solid #ababab;
		border-radius: 5px;
	}
	.left .top{
		padding: 10px 20px;
		background-color: #cfd9e7;
		border-radius: 5px;
	}
	.left .btm{
		padding: 10px 20px;
		display: flex;
		flex-direction: column;
	}
	.left .btm>label{
		padding: 10px 0;
	}
	
	.mid{
		margin-top: 50px;
	}
</style>
