import { VueOkrTree } from "../lib/index.js";
import BaseCard from "./BaseCard.vue";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
export default {
  components: {
    VueOkrTree,
    BaseCard
  },
  data() {
    return {
      Prism,
      testData: [
        {
          label: "xxx科技有有限公司",
          children: [
            {
              label: "产品研发部",
              children: [
                {
                  label: "研发-前端"
                },
                {
                  label: "研发-后端"
                },
                {
                  label: "UI 设计"
                }
              ]
            },
            {
              label: "销售部",
              children: [
                {
                  label: "销售一部"
                },
                {
                  label: "销售二部"
                }
              ]
            },
            {
              label: "财务部"
            }
          ]
        }
      ]
    };
  }
};
