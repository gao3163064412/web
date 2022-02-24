<template>
  <div class="app-container home">
    <div class="Data">
      <p>基础信息</p>
      <div class="dataBox">
        <div class="datas" v-for="item in datas" :key="item.data">
          <span>{{ item.data }}</span>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div>
      <p>柱状图</p>
      <bar-chart :chart-data="lineChartData" />
    </div>
    <div>
      <p>线形图</p>
      <line-chart :chart-data="lineChartData" />
    </div>

    <theme-picker style="display: none;" @change="themeChange" />

  </div>
</template>

<script>
  import {getTheme} from "@/api/setting";
import BarChart from "./dashboard/BarChart";
import LineChart from "./dashboard/LineChart";
  import ThemePicker from "../components/ThemePicker/index";
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
};
export default {
  name: "index",
  data() {
    return {
      datas: [
        {
          data: 15473528,
          name: "单日访问人数",
        },
        {
          data: 548511,
          name: "访问流量",
        },
        {
          data: 78452514,
          name: "访问时长",
        },
        {
          data: 1178452514,
          name: "总访问人数",
        },
        {
          data: 117845251,
          name: "总访问人数",
        },
        {
          data: 11784525,
          name: "总访问人数",
        },
        {
          data: 1178452,
          name: "总访问人数",
        },

        {
          data: 11784,
          name: "总访问人数",
        },
        {
          data: 1178452512,
          name: "总访问人数",
        },
        {
          data: 1178452513,
          name: "总访问人数",
        },
      ],
      lineChartData: lineChartData.newVisitis,
      theme: ''
    };
  },
  created() {
    // 获取主题信息并更新
    getTheme().then(res=>{
      this.$store.dispatch('settings/getSetting', res.data);
      this.themeChange(res.data.theme)
    })
  },
  methods: {
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
      this.theme = val;
    },
  },
  components: {
    ThemePicker,
    BarChart,
    LineChart,
  },
};
</script>

<style scoped lang="scss">
.home {
  .dataBox {
    display: flex;
    justify-content: space-between;
    .datas {
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100px;
      box-shadow: 1px 1px 4px 1px #ccc;
    }
  }
}
</style>

