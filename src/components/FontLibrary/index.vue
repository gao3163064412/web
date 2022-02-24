<template>
  <!-- 展示字符库 -->
  <el-drawer :title="title" :visible.sync="showFontLibrary.isShow" size="50%">
    <el-tabs type="border-card">
      <el-tab-pane label="上标">
        <div class="flx wrap">
          <div
            class="chartItem flx just_center al_c"
            :class="pubVal === pubItem ? 'selItem' : ''"
            v-for="(pubItem, index) in pubDatas"
            :key="index + '1'"
            @click="copyValue(pubItem)"
          >
            {{ pubItem }}
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="下标"
        ><div class="flx wrap">
          <div
            class="chartItem flx just_center al_c"
            :class="pubVal === subItem ? 'selItem' : ''"
            v-for="(subItem, index) in subDatas"
            :key="index + '1'"
            @click="copyValue(subItem)"
          >
            {{ subItem }}
          </div>
        </div></el-tab-pane
      >
      <el-tab-pane label="特殊字符"
        ><div class="flx wrap">
          <div
            class="chartItem flx just_center al_c"
            :class="pubVal === spe ? 'selItem' : ''"
            v-for="(spe, index) in specials"
            :key="index + '1'"
            @click="copyValue(spe)"
          >
            {{ spe }}
          </div>
        </div></el-tab-pane
      >
    </el-tabs>
    <!-- <div class="specialCode">
      <div class="borderLine">上标</div>
      <div class="pubContent">
        <el-input
          class="inputTablet"
          :class="pubVal === pubItem ? highlightBorder : ''"
          :value="pubItem"
          v-for="(pubItem, index) in pubDatas"
          :key="index + '1'"
          readonly
          @click.native="copyValue(pubItem)"
        />
      </div>
    </div>
    <div class="specialCode">
      <div class="borderLine">下标</div>
      <div class="pubContent">
        <el-input
          class="inputTablet"
          :class="pubVal === subItem ? highlightBorder : ''"
          :value="subItem"
          v-for="(subItem, index) in subDatas"
          :key="index + '2'"
          readonly
          @click.native="copyValue(subItem)"
        />
      </div>
    </div>
    <div class="specialCode">
      <div class="borderLine">特殊字符</div>
      <div class="pubContent">
        <el-input
          class="inputTablet"
          :class="pubVal === spe ? highlightBorder : ''"
          :value="spe"
          v-for="(spe, index) in specials"
          :key="index + '3'"
          readonly
          @click.native="copyValue(spe)"
        />
      </div>
    </div> -->
    <!-- <div style="text-align: center">
        <el-button type="primary"  @click="close">确 定</el-button>
        <el-button @click="close">关闭</el-button>
</div> -->
  </el-drawer>
</template>

<script>
export default {
  props: {
    showFontLibrary: {
      type: Object,
    },
  },
  components: {},
  data() {
    return {
      title: "字符库",
      pubVal: "",
      //   highlightBorder: "highlightBorder",
      pubDatas: [
        "⁺",
        "⁰",
        "¹",
        "²",
        "³",
        "⁴",
        "⁵",
        "⁶",
        "⁷",
        "⁸",
        "™",
        "ª",
        "ᵇ",
        "ᶜ",
        "ᵈ",
        "ᶠ",
        "ᶢ",
        "®",
        "-",
        "¯",
      ],
      subDatas: [
        // "₋",
        "₋",
        "₀",
        "₁",
        "₂",
        "₃",
        "₄",
        "₅",
        "₆",
        "₇",
        "₈",
        "₉",
        "ₐ",
        "ₑ",
        // "-",
      ],
      specials: [
        "℃",
        "°",
        "≤",
        "≥",
        "＜",
        "＞",
        "±",
        "＋",
        "－",
        "×",
        "÷",
        "‰",
        "％",
        "√",
      ],
    };
  },
  computed: {},
  mounted() {},
  methods: {
    close() {
      this.showFontLibrary.isShow = false;
    },
    copyValue(val) {
      this.pubVal = val;
      const save = function (e) {
        e.clipboardData.setData("text/plain", val);
        e.preventDefault(); //阻止默认行为
      };
      document.addEventListener("copy", save);
      document.execCommand("copy"); //使文档处于可编辑状态，否则无效
      this.$message({
        message: "已复制",
        type: "success",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.borderLine {
  border-bottom: 1px solid #dddddd;
}
::v-deep {
  .el-drawer__body {
    padding-left: 20px;
  }
  .el-drawer {
    background: #ffffff !important;
  }
  .el-tabs--border-card > .el-tabs__content {
    min-height: 600px;
  }
}
.chartItem {
  width: 60px;
  height: 40px;
  margin: 4px;
  background: #f7f7f7;
  border-radius: 4px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.65);
  text-align: center;
  cursor: pointer;
  border: 1px solid transparent;
}
.chartItem:hover {
  background-color: #f2f8ff;
  border: 1px solid #007aff;
  color: #007aff;
}
.selItem {
  color: #fff;
  background-color: #007aff;
}
</style>
