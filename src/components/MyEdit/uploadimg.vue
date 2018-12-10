<template>
	<div class="upimg">
		<input type="file" id="upImg" style="display: none" ref="upImg"  @change="getuploadImg()">
        <div v-if="addimgflag" class="showimg">
            <img :src="uploadimg.base64" width=70 height=70 alt="" >
            <label for="upImg" class="reloadimg">
               <span>重新上传</span>
            </label>
		</div>
		<div v-else class="addimg">
		    <label for="upImg" class="chooseImg">
		       <p style="font-size:24px">+</p>
		       <p style="font-size:12px">点击上传</p>
		   </label>
		</div>
	</div>
</template>
<script>
export default {
  name: 'uploadimg',
  data () {
    return {
	     addimgflag:false,
            uploadimg:{
                name:'',
                base64:''
            },
    }
  },
  mounted(){
  	var uploadimg=sessionStorage.getItem('uploadimg')
        if(uploadimg){
            this.addimgflag=true;
            this.uploadimg=JSON.parse(uploadimg);
        }
  },
  methods: {
        getuploadImg:function(e){
            console.log(e,this.$refs.upImg.files,this.$refs.upImg.files.name)
            var upimg=this.$refs.upImg.files[0];
            var type=upimg.name.toLowerCase().split('.')[1];
            if(upimg.size<500000&&(type==="jpg"||type==="png")){
                var reader=new FileReader();
                reader.readAsDataURL(upimg);

                reader.onload = function(e) {
                    console.log(e.target)
                    this.addimgflag=true;
                    this.uploadimg.base64=e.target.result;
                    this.uploadimg.name=upimg.name;
                    sessionStorage.setItem('uploadimg',JSON.stringify(this.uploadimg))
                    // var image = new Image();
                    // this.$refs.showImg.src = e.target.result;
                    // image.onload=function () {
                    //    console.log(e,"图片的宽度为"+this.width+",长度为"+this.height);
                    // }
                }.bind(this);
            }else{
                this.$Message.warning({
                    // content :en==false?"请选择平台": 'Please select a platform ',
                    content :"上传图片必须小于500K，并且为png, jpg格式。"
                });
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.upimg{
	.showimg{
		width: 70px;
		height: 70px;
		margin: auto;
		position: relative;
		font-family: PingFangSC-Regular;
		color: #B8B8B8;
		letter-spacing: 0;
		.reloadimg{
			width: 80px;
			height: 20px;
			position: absolute;
			left: 80px;
			bottom: -5px;
			cursor: pointer;
			text-decoration: underline;
			line-height: 15px;
			&:hover{
				color: #FF811D;
			};
		}
	}
	.addimg {
		width: 70px;
		height: 70px;
		margin: auto;
		text-align: center;
		border: 1px solid #C2C2C2;
		position: relative;
		font-family: PingFangSC-Regular;
		color: #B8B8B8;
		letter-spacing: 0;
		.chooseImg{
			width: 70px;
			height: 70px;
			line-height: 50%;
			cursor: pointer;
		}
		&:after{
			content: "图片格式：大小 70*70px ，小于500K；png, jpg格式。";
			width: 300px;
			display: inline-block;
			position: absolute;
			left: 80px;
			bottom: 2px;
			font-size: 12px;
		};
	}
}
</style>