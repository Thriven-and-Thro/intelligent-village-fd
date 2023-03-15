<template>
  <div class="summernoteBox">
    <div :id="id"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "CfSummernote",
  props: {
    value: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: "summernote" + new Date().getTime()
    }
  },
  // watch: {
  //   id: {
  //     handler(newval) {
  //       console.log(newval)
  //     },
  //     immediate: true
  //   }
  // },
  // data() {
  //   return {
  //     id: "summernote" + new Date().getTime()
  //   }
  // },
  mounted() {
    var self = this
    self.summernoteInit().then(() => {
      // summernote发生改变
      $("#" + self.id).on(
        "summernote.change",
        function (we: any, contents: any, $editable: any) {
          self.summerNoteChange()
          // console.log("contents", contents)
        }
      )
      // console.log(self.value, "self.value")
      //初始赋值
      $("#" + self.id).summernote("code", self.value)
    })
  },
  methods: {
    summernoteInit() {
      //编辑器初始化
      var self = this
      return new Promise((resolve) => {
        //初始化摘要内容富文本编辑器
        $("#" + self.id).summernote({
          lang: "zh-CN", //语言
          placeholder: "请输入内容", //提示语
          height: 250, //高度
          //  'auto',//宽度  也可以指定宽度
          htmlMode: true,
          toolbar: [
            //工具栏配置
            ["style", ["style"]],
            ["font", ["bold", "underline", "clear"]],
            ["fontsize", ["fontsize"]],
            ["fontname", ["fontname"]],
            ["color", ["color"]],
            ["para", ["ul", "ol", "paragraph", "height", "hr"]],
            ["table", ["table"]],
            ["insert", ["link", "picture", "video"]],
            ["view", ["fullscreen", "codeview", "help"]]
          ],
          fontSizes: [
            "12",
            "14",
            "16",
            "18",
            "20",
            "24",
            "28",
            "32",
            "36",
            "48"
          ],
          fontSizeUnits: ["px"],
          fontNames: [
            //字体类型配置
            "宋体",
            "微软雅黑",
            "楷体",
            "黑体",
            "隶书",
            "Arial",
            "Arial Black",
            "Comic Sans MS",
            "Courier New",
            "Georgia",
            "Georgia2",
            "Merriweather"
          ],
          callbacks: {
            //回调函数
            onSubmit: function () {
              // vm.richContent = $('#summernote').summernote('code')
            },
            onKeyup: function () {
              //
            }
          }
        })
        resolve(void 0)
      })
    },
    summerNoteChange() {
      //富文本编辑器发生改变
      var self = this
      self.$emit("summernoteInput", $("#" + self.id).summernote("code"))
    }
  }
})
</script>

<style scoped>
.summernoteBox :deep(.note-editable ul) {
  padding: 0 20px;
}
.summernoteBox :deep(.note-editable ul li) {
  list-style: disc;
}
.summernoteBox :deep(.note-editable ol li) {
  list-style: decimal;
}
.summernoteBox :deep(.note-editable ol) {
  padding: 0 20px;
}
</style>
