<template>
	<div class="publicOpinion" style="height: 100%;width: 100%;">
        <ul>
            <li v-for="(item,index) in publicTrendMark" :class="{'even':index%2&&(item!=null), 'odd':!(index%2)}" :style="{backgroundColor:(index==TrendInx?trendColor[index]:'#f1f1f1')}">
                <span class="cnt">{{item}}</span>
                <div  v-if="!(index%2)" class="faceImg normalImg" :class="'normalImg'+(index/2+1)" v-show='!((TrendInx!=null)&&(index/2==Math.floor(TrendInx/2)))' ></div>
                <div  v-if="!(index%2)" class="faceImg expressImg" :class="'expressionImg'+(index/2+1)" v-show='(TrendInx!=null)&&(index/2==Math.floor(TrendInx/2))' ></div>
            </li>
        </ul>
    </div>
</template>
<script type="text/javascript">
export default {
  name: 'Trend',
  data () {
    return {
      publicTrendMark:[-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1, null],
      trendColor:['#FA862C','#FFA21C','#FFB851','#FFC46D','#FFD486','#FFDFA5','#FFEFAA','#CEFEF2','#BBFFEE','#9DF3DD','#7FE6CB','#67D5B9'],
      TrendInx:null,
    }
  },
  mounted () {
	var trendper;
    // staticData.positiveCount=parseInt(staticData.positiveCount);
    // staticData.negativeCount=parseInt(staticData.negativeCount);
    // staticData.neutralCount=parseInt(staticData.neutralCount);
    // if(staticData.positiveCount+staticData.negativeCount+staticData.neutralCount>0){
    //     TrendPer=(staticData.positiveCount-staticData.negativeCount)/(staticData.positiveCount+staticData.negativeCount+staticData.neutralCount);
    // }else{
    //     vm.TrendInx=null;
    // }
    trendper=0.2;
    // console.log('TrendPer',typeof(staticData.positiveCount),staticData.negativeCount,staticData.neutralCount);
    // this.publicTrendMark.some(function(item,index){
    //     if((item!=null)&&(trendper>item-0.19)&&(trendper<=item)){
    //         // console.log('FACE',TrendPer,item,index);
    //         this.TrendInx=index;
    //     }
    // })
    this.TrendInx=6;
  },
  methods:{

  }
}
</script>
<style lang="scss">
.publicOpinion{
	ul{
		list-style: none;
		width: calc(34px*12);
	    /*margin-left: 30px;*/
	    margin: auto;
	    li{
	    	position: relative;
		    display: inline-block;
		    width: 33px;
		    height: 33px;
		    margin-right: 1px;
		    background: #f1f1f1;
		    box-sizing: border-box;
		    span{
		    	&.cnt{
					display: block;
					position: absolute;
					left:15px;
					top:-36px;
					width: 100%;
					text-align: center;
					font-size: 12px;
					color: #000000;
		    	}
		    }
		    div{
		    	&.faceImg{
				    background-repeat: no-repeat;
				    background-size: 100%;
				    z-index: 88
		    	}
		    	&.normalImg{
					position:absolute;
					left:50%;top:165%;
					height: 33px;
					width: 33px;
		    	}
		    	&.expressImg{
		    		position:absolute;
				    left:25%;top:140%;
				    height: 50px;
				    width: 50px;
		    	}
		    	&.normalImg1{
					background-image: url('../../assets/img_expression_normal_1.png');
		    	}
		    	&.normalImg2{
					background-image: url('../../assets/img_expression_normal_2.png');
		    	}
		    	&.normalImg3{
					background-image: url('../../assets/img_expression_normal_3.png');
		    	}
		    	&.normalImg4{
					background-image: url('../../assets/img_expression_normal_4.png');
		    	}
		    	&.normalImg5{
					background-image: url('../../assets/img_expression_normal_5.png');
		    	}
		    	&.normalImg6{
					background-image: url('../../assets/img_expression_normal_6.png');
		    	}
		    	&.expressionImg1{
					background-image: url('../../assets/img_expression_1.png');
		    	}
		    	&.expressionImg2{
					background-image: url('../../assets/img_expression_2.png');
		    	}
		    	&.expressionImg3{
					background-image: url('../../assets/img_expression_3.png');
		    	}
		    	&.expressionImg4{
					background-image: url('../../assets/img_expression_4.png');
		    	}
		    	&.expressionImg5{
					background-image: url('../../assets/img_expression_5.png');
		    	}
		    	&.expressionImg6{
					background-image: url('../../assets/img_expression_6.png');
		    	}
		    }
		    &.odd:after{
	    	    content: '';
			    position: absolute;
			    left: 33px;
			    top:-15px;
			    width: 1px;
			    height:47px;
			    background: #333333;
			    margin-right: 1px;
			    z-index: 99;
		    }
		    &.even:after{
		    	content: '';
			    position: absolute;
			    left: 33px;
			    top:-15px;
			    width: 1px;
			    height:120px;
			    background: #333333;
			    margin-right: 1px;
		    }
	    }
	}
}
</style>