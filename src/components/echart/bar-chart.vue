<template>
	<div ref="bar_chart" style="height: 100%;width: 100%;"></div>
</template>
<script type="text/javascript">
import echarts  from 'echarts'
export default {
  name: 'barChart',
  props:{
      barchartdata: {
          // tooltipformat: String,
          // xformat: String,
          stime:String,
          etime:String,
          // framePlatforms:Object,
          platformNames:Array ,
          colors:Array,
          dimensions:Array,
          barwidth:String,
          barcount:Number,
          bargap:String,
          barsizeY:Array,
      }
  },
  data () {
    return{
        framePlatforms:{
            sIndex : 0,
            eIndex :0
        },
        tooltipformat:'',
        xformat:''
    }
  },
  mounted () {
    this.$nextTick(function(){
          this.createColumn();
      })
  },
  watch:{
        barchartdata:{
            handler:function(cur,old){
                this.createColumn();
            },
            deep: true
        },
    },
  methods:{
    createColumn:function(){
            console.log(this.barchartdata.platformNames);
            // var platformNames=[{platformName: "语言质量"}],series=[],legendData=[];
            var platformNames=[],series=[],legendData=[],dataZoom=[];
            this.barchartdata.platformNames.forEach(function (item) {
                platformNames.push(item.platformName);
            })
            var colors=this.barchartdata.colors;
            var dimensions=this.barchartdata.dimensions;
            var barwidth=this.barchartdata.barwidth;
            var barcount=this.barchartdata.barcount;
            var bargap=this.barchartdata.bargap;
            var barsizeY=this.barchartdata.barsizeY;
            var barChart=echarts.init(this.$refs.bar_chart);
            console.log(platformNames.length,barcount,dataZoom);
            dimensions.forEach(function (item,i) {
                var serie = {
                    name : item.name,
                    type : 'bar',
                    data : item.data,
                    itemStyle : {
                        normal : {
                            color : colors[i],
                            label : {
                                show : true,
                                position : 'top',
                                formatter : '{c}',
                                textStyle : {
                                    color : '#3a3e55'
                                }
                            }
                        },
                        emphasis : {
                            label : {
                                textStyle : {
                                    fontWeight : 'bold',
                                    color : '#3a3e55'
                                }
                            }
                        }
                    },
                    barGap : bargap, //柱状图间隙,
                    barCategoryGap : '20%',
                };
                series.push(serie);
                legendData.push(serie.name); //图例名称

            })
            this.tooltipformat=function (params) {
                var stime=this.barchartdata.stime;
                var etime=this.barchartdata.etime;
                stime = !stime ? '' : stime.substring(0, 4) + '/' + stime.substring(4, 6) + '/' + stime.substring(6, 8);
                etime = !etime ? '' : etime.substring(0, 4) + '/' + etime.substring(4, 6) + '/' + etime.substring(6, 8);
                var res = '<div class="legend-box" style="padding-left: 20px;">';
                // res += '<strong>' + params[0].name + '</strong>'; //悬浮框标题
                res += '<p style="font-size:12px;color:#999999;letter-spacing:0;line-height:24px;text-align:left;">' + stime + ' - ' + etime + '</p>'

                for (var i = 0, l = params.length; i < l; i++) {
                    var value=params[i].value==undefined||params[i].value=="NaN" ?"":params[i].value
                    // if ("FF" == mb) {
                    //     res += '<p class="legend-text">' + '<i class="legend-square" style="background-color: ' + colors[i] + ';width: 14px;height: 14px;position: relative;left: -6.5px;"></i><span style="font-family:PingFangSC-Regular;font-size:14px;color:#333333;letter-spacing:0;line-height:24px;text-align:left;">' + params[i].seriesName + '</span>  ' + '<span style="float: right;margin-right:5px;margin-top: -18px">' + value + '</span>'
                    // } else {
                        res += '<p class="legend-text">' + '<i class="legend-square" style="background-color: ' + colors[i] + ';width: 14px;height: 14px;position: relative;left: -6.5px;"></i><span style="font-family:PingFangSC-Regular;font-size:14px;color:#333333;letter-spacing:0;line-height:24px;text-align:left;">' +params[i].seriesName + '</span>  ' + '<span style="float: right;margin:0 5px">' + value + '</span>'
                    // }
                }
                res += '</p></div>';
                return res;
            }.bind(this);
            this.xformat=function (params) {
                var platformName = params;
                console.log('params',params);
                if (platformNames.length <= 10) {
                    platformName = this.countWord(platformName, 16);
                } else if (platformNames.length <= 16) {
                    platformName = this.countWord(platformName, 16);
                } else {
                    platformName = this.countWord(platformName, 16);
                }
                console.log(333,platformName);
                if (platformName.rowNum == 1) {
                    // return platformName.word + '\n\n\n\n' + "";
                    return '\n\n\n\n' + "";
                }
                if (platformName.rowNum == 2) {
                    return platformName.word + '\n\n\n' + "";
                }
                if (platformName.rowNum >= 3) {
                    return platformName.word + '\n\n' + "";
                }
                return platformName.word + '\n\n' + "";
            }.bind(this);
            var option = {
                title : {
                    // text: '研发工具满意度总览',
                    show : true,
                    textStyle : {
                        fontFamily : 'PingFangSC-Regular',
                        fontSize : 24,
                        color : '#333333',
                        fontWeight : '400'
                    },
                },
                tooltip : {
                    trigger : 'axis',
                    backgroundColor : 'rgba(255,255,255,1)',
                    extraCssText : 'box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);',
                    textStyle : {
                        color : '#333'
                    },
                    axisPointer : {
                        type : 'shadow'
                    },
                    formatter :this.tooltipformat
                },
                legend : {
                    x : 'right',
                    itemGap : 15,
                    data : legendData,
                    textStyle : {
                        fontSize : '14',
                        color : '#3a3e55',
                        fontFamily : " '微软雅黑', '宋体'"
                    },
                    top : '620',
                    left : 'center'
                },
                grid : {
                    show : false,
                    left : '30',
                    right : '1%',
                    bottom : '70',
                    containLabel : true
                },
                yAxis : {
                    max: barsizeY[1],
                    min : barsizeY[0],
                    splitLine : {
                        show : true,
                        lineStyle : {
                            color : '#eaeaea',
                            type : 'dashed',
                            width : 1
                        }
                    },
                    type : 'value',
                    splitNumber : 10,
                    //            max: 100,
                    boundaryGap : [ 0, 0.01 ],
                    axisLine : {
                        show : false,
                        lineStyle : {
                            color : "#999",
                            fontSize : "12"
                        }
                    }, //y轴线隐藏
                    axisTick : { //刻度
                        show : false
                    }
                },
                dataZoom : dataZoom,
                xAxis : {
                    axisLine : {
                        lineStyle : {
                            color : "#eaeaea",
                        }
                    },
                    type : 'category',
                    data : platformNames,
                    axisTick : { //刻度
                        show : false
                    },
                    axisLabel : {
                        show : true,
                        textStyle : {
                            fontSize : '14',
                            color : '#666',
                            fontFamily : " '微软雅黑', '宋体'"
                        },
                        interval : 0,
                        formatter :this.xformat
                    }
                },
                barWidth : barwidth, //柱状图宽
                barGap : bargap, //柱状图间隙,
                barCategoryGap : '50%',
                series : series
            };
            // 使用刚指定的配置项和数据显示图表。
            barChart.setOption(option);
            barChart.on('click', function(params) {
                this.$emit('econsole',params);
                this.$emit('test','test');
            }.bind(this));
            // $(window).on('resize',function(){
            //     vm.maxwidth=$("#js_column").width()+40
            // });
        },
        countWord:function (word, splitNum) {
            var newParamsName = "";
            var paramsNameNumber = word.length;
            var provideNumber = splitNum;
            var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
            if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    var start = p * provideNumber;
                    var end = start + provideNumber;
                    if (p == rowNumber - 1) {
                        tempStr = word.substring(start, paramsNameNumber);
                    } else {
                        tempStr = word.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr;
                }
            } else {
                newParamsName = word;
            }
            return {
                rowNum : rowNumber,
                word : newParamsName
            };
        }
  }
}
</script>
<style lang="scss">

</style>