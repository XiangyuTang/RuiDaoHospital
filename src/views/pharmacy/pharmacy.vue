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
      </b-col>
      <b-col lg="9">
        <!--门诊发药单-->
        <medicineList>
        </medicineList>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import patientInfo from "./component/patientInfo";
  import patientsList from "./component/patientsList";
  import medicineList from "./component/medicineList";

  export default {
    //更改，设置非药品不可选，切换病人时级联保存
    name: "pharmacy_new",
    components: {patientInfo, patientsList, medicineList}
  }
</script>

<style scoped>

</style>
