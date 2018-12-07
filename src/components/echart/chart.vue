<template>
	<div>
		<div class="pie">
			<pieChart :rosepiedata="tredpiedata"></pieChart>
		</div>
		<div class="bar">
			<barChart :barchartdata="barchartdataA" ></barChart>
		</div>
		<div class="linebar">
			<lineBar ></lineBar>
		</div>
		<div class="line">
			<lineChart></lineChart>
		</div>
	</div>
</template>
<script type="text/javascript">
import pieChart from "./pie-chart"
import barChart from "./bar-chart"
import lineBar from "./line-bar"
import lineChart from "./line-chart"

export default {
  name: 'Chart',
  components:{
	pieChart,barChart,lineChart,lineBar
  },
  data () {
    return {
      	tredpiedata:{
	        // legendData:['负向','中性','正向'],
	        // datas:[{"value":9,"name":'负向'}, {"value":3,"name":'中性'},
	        //     {"value":1,"name":'正向'}],
	        // colors:['#FF5F38','#FFC04C','#67D5B9'],
	        legendData:[],
	        datas:[],
	        colors:[],
	        Ypox:'56%',
	        format:'{a|{d}%;} {a|{c}} \n {b|{b}}'
	    },
	    langpiedata:{
	        legendData:['中英','多语言'],
	        datas:[{"value":2078,"name":'中英'}, {"value":3000,"name":'多语言'}],
	        colors:['#E8AE32','#905AE7'],
	        format:"{a|{c}Person} \n {b|{b}}"
	    },
	    barchartdataA: {
            stime: '',
            etime: '',
            platformNames:[] ,
            colors:[],
            dimensions:[],
            barwidth:'',
            barcount:0,
            bargap:'',
            barsizeY:[10,100],
        },
    }
  },
  mounted () {
  	this.createpie()
  	this.createbar()
  },
  methods:{
  	createpie(){
  		var staticData={
	  		negativeCount:30,
	  		neutralCount:50,
	  		positiveCount:80
	  	},datas=[],colors=[];
		var legendData = ['positiveCount', 'neutralCount', 'negativeCount'];
	    if (staticData.negativeCount != 0) {
	        datas.push({"value": staticData.negativeCount, "name": 'negativeCount'});
	        colors.push('#FF5F38');
	    };
	    if (staticData.neutralCount != 0) {
	        datas.push({"value": staticData.neutralCount, "name": 'neutralCount'});
	        colors.push('#FFC04C');
	    };
	    if (staticData.positiveCount != 0) {
	        datas.push({"value": staticData.positiveCount, "name": 'positiveCount'});
	        colors.push('#67D5B9');
	    };
	    if(staticData.positiveCount == 0 &&staticData.neutralCount == 0&&staticData.negativeCount == 0){
	        colors = ['#F1F1F1', ' #F1F1F1', '#F1F1F1']; //图例颜色
	        datas=[{"value":0,"name":'negativeCount'}, {"value":0,"name":'neutralCount'},
	            {"value":0,"name":'positiveCount'}]
	    }
	    this.tredpiedata.legendData=legendData;
	    this.tredpiedata.datas=datas;
	    this.tredpiedata.colors=colors;
  	},
  	createbar(){
  		var barwidth="60px";
        var barcount=5;
        var bargap='80%';
        var barsizeY=[0,10];
        var colors = [ '#FD995F','#DBC9A3', '#B8E5E5', '#D4B5E0', '#B7C8E9', '#BBE7B7', '#EEEDC2'," #85D4D7" ,"#FADBA1","#E0BABA"]; //图例颜色
        var platformNames=['Git']
        var dimensions=[{
        	name:'Overall',
        	data:'8'
        },{
        	name:'Usability',
        	data:'7'
        },{
        	name:'Technical',
        	data:'9'
        },{
        	name:'Stability',
        	data:'7'
        },{
        	name:'Documentation',
        	data:'5'
        }]
		this.barchartdataA.stime= '20180801';
        this.barchartdataA.etime= '20181201';
        this.barchartdataA.platformNames= platformNames ,
        this.barchartdataA.colors = colors,
        this.barchartdataA.dimensions= dimensions,
        this.barchartdataA.barwidth= barwidth,
        this.barchartdataA.barcount= barcount,
        this.barchartdataA.bargap= bargap,
        this.barchartdataA.barsizeY= barsizeY
  	}
  }
}
</script>
<style lang="scss">
.pie{
	width: 420px;
	height: 240px;
	margin: 0 auto;
}
.bar{
	width: 900px;
	height: 750px;
	margin: 0 auto;
}
.linebar{
	width: 900px;
	height: 750px;
	margin: 0 auto;
}
.line{
	width: 500px;
	height: 300px;
	margin: 0 auto;
}
</style>