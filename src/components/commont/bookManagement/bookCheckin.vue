<template>
  <div>
    <div>
      <h3 style="position: relative;left: -570px">借阅情况</h3>
      <div style="height:2px;width:100%;border-top:1px solid #ccc;float:left;"></div>
    </div>
    <div class="book1">
      <div
          style="height: 200px;width: 300px;
          background-color: deepskyblue;border-radius: 8px;margin-left: 10px;">
        <div class="book_text">
          <h3>当前预约人数</h3>
          <i style="font-size: 50px">{{num}}人</i>  <!-- 从数据库获取  -->
        </div>
      </div>
      <div
          style="height: 200px;width: 300px;
          background-color: deepskyblue;border-radius: 8px;margin-left: 10px;">
        <div class="book_text">
          <h3 class="book_text">再借书籍</h3>
          <i style="font-size: 50px">{{num}}人</i>  <!-- 从数据库获取  -->
        </div>
      </div>
      <div
          style="height: 200px;width: 300px;
          background-color: deepskyblue;border-radius: 8px;margin-left: 10px;">
        <div class="book_text">
          <h3 class="book_text">已还书籍</h3>
          <i style="font-size: 50px">{{num}}人</i>  <!-- 从数据库获取  -->
        </div>
      </div>
      <div
          style="height: 200px;width: 300px;
          background-color: deepskyblue;border-radius: 8px;margin-left: 10px;">
        <div class="book_text">
          <h3 class="book_text">逾期未还</h3>
          <i style="font-size: 50px">{{num}}人</i>  <!-- 从数据库获取  -->
        </div>
      </div>
    </div>

    <div style="position: absolute;left: 246px;top: 400px">
      <div style="height:2px;width:100%;border-top:1px solid #ccc;float:left;"></div>
      <h3>借阅统计</h3>
      <div id="echarts">
        <div style="width: 600px;height: 380px;" id="column"></div>
        <div style="width: 600px;height: 380px;" id="pie"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "bookCheckin",
  data() {
    return{
      num: ''  /*获取数据储存在num*/
    }
  },
  created() {
  },
  mounted() {
    this.echartsInit()
    this.echartsPie()
  },
  methods: {
    echartsInit() {
      echarts.init(document.getElementById('column')).setOption({
        xAxis: {
          type: 'category',
          data: ['java实践基础', 'JavaScript', '活着', '马克思主义', '经济学']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [180, 150, 150, 100, 120],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      })
    },
    echartsPie() {
      echarts.init(document.getElementById('pie')).setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 780, name: '教职工' },
              { value: 7735, name: '学生' },
            ]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
/* 四个盒子整体的样式 */
.book1 {
  display: flex;
  justify-content: center;
  color: white;
  position: absolute;
  left: 310px;
  margin-top: 10px;
}

.book_text {
  margin-left: -80px;
}

#echarts{
  display: flex;
  justify-content: center;
}
</style>