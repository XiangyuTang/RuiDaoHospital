<template>
  <div>
    <!--患者信息-->
    <b-row>
      <b-col lg="12">
        <patientInfo></patientInfo>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="3">
        <!--患者列表-->
        <patientsList>
        </patientsList>
        <!--项目列表-->
        <techItemsList>
        </techItemsList>
      </b-col>
      <b-col lg="9">
        <!--项目明细-->
        <itemDetails>
        </itemDetails>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import patientInfo from "./component/patientInfo";
  import patientsList from "./component/patientsList";
  import techItemsList from "./component/techItemsList";
  import itemDetails from "./component/itemDetails";
  import axios from "axios";
  import {mapState} from "vuex";

  export default {
    //更改，设置非药品不可选，切换病人时级联保存
    name: "tech_new",
    components: {patientInfo, patientsList, techItemsList, itemDetails},
    data: () => {
      return {}
    },
    computed: {},
    methods: {},
  }
</script>

<style scoped>

</style>
