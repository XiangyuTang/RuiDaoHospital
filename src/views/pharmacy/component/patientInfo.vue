<template>
  <b-card>
    <b-row>
      <b-col lg="1"></b-col>
      <b-col lg="2">
        <span><i class="fa fa-id-card"> 病历号</i> : {{initialPatient.medicalRecordId}}</span>
      </b-col>
      <b-col lg="2">
        <span><i class="fa fa-user"> 患者姓名</i> : {{initialPatient.patientName}}</span>
      </b-col>
      <b-col lg="2">
        <span><i class="fa fa-genderless"> 性别</i> : {{initialPatient.patientGenderStr}}</span>
      </b-col>
      <b-col lg="2">
        <span><i class="fa fa-money"> 年龄</i> : {{initialPatient.patientAge}}</span>
      </b-col>
      <b-col lg="2">
        <span><i class="fa fa-hashtag"> 支付方式</i> : {{initialPatient.calculationType}}</span>
      </b-col>
      <b-col lg="1"></b-col>
    </b-row>
  </b-card>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "patientInfo",
    data() {
      return {
        initialPatient: {medicalRecordId: "未选择", patientName: "未选择", patientGenderStr: '未选择', patientAge: '未选择', calculationType:'未选择'}
      }
    },
    computed: {
      ...mapState("tech", ['patient'])
    },
    watch: {
      patient:{
        handler() {
          // console.log(this.patient);
          this.initialPatient = this.patient;
        },
      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
