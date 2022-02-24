<template>
  <span>{{
    hour
      ? hourString + ":" + minuteString + ":" + secondString
      : minuteString + ":" + secondString
  }}</span>
</template>

<script>
export default {
  data() {
    return {
      hour: sessionStorage.getItem('hour')||'',
      minute: sessionStorage.getItem('minute')||'',
      second: sessionStorage.getItem('second')||'',
      promiseTimer: "",
    };
  },
  props: {
    remainTime: {
      // 倒计时间总秒数
      default: "",
    },
  },
  created() {
            // console.log(this.MillisecondToTime (600000));
  },
  watch: {
    remainTime(val) {
         if (val > 0) {
          this.hour=sessionStorage.getItem('hour')||'';
          this.minute=sessionStorage.getItem('minute')||''
          this.second=sessionStorage.getItem('second')||''   
          this.hour = Math.floor((val / 3600) % 24);
          this.minute = Math.floor((val/ 60) % 60);
          this.second = Math.floor(val % 60);
          this.countDowm();
         }
    },
  },
  mounted() {
    if (this.remainTime > 0) {
      this.hour=sessionStorage.getItem('hour')||'';
      this.minute=sessionStorage.getItem('minute')||''
      this.second=sessionStorage.getItem('second')||''   
      this.hour = Math.floor((this.remainTime / 3600) % 24);
      this.minute = Math.floor((this.remainTime / 60) % 60);
      this.second = Math.floor(this.remainTime % 60);
      this.countDowm();
    }
  },
  methods: {
    countDowm() {
      var self = this;
      clearInterval(this.promiseTimer);
      this.promiseTimer = setInterval(function () {
        if (self.hour === 0) {
          if (self.minute !== 0 && self.second === 0) {
            self.second = 59;
            self.minute -= 1;
          } else if (self.minute === 0 && self.second === 0) {
            self.second = 0;
            self.$emit("countDowmEnd", true);
            clearInterval(self.promiseTimer); //倒计时结束
          } else {
            self.second -= 1;
          }
        } else {
          if (self.minute !== 0 && self.second === 0) {
            self.second = 59;
            self.minute -= 1;
          } else if (self.minute === 0 && self.second === 0) {
            self.hour -= 1;
            self.minute = 59;
            self.second = 59;
          } else {
            self.second -= 1;
          }
        }
      }, 1000);
    },
    formatNum(num) {
      return num < 10 ? "0" + num : "" + num;
    },
  },
  computed: {
    hourString() {
      return this.formatNum(this.hour);
    },
    minuteString() {
      return this.formatNum(this.minute);
    },
    secondString() {
      return this.formatNum(this.second);
    },
  },
};
</script>