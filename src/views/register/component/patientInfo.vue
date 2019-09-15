<template>

      <b-card>
        <b-row>
          <b-col lg="2">
            <!--                  <span><i class="fa fa-money"> 缴费方式</i> : {{this.computedCalculationType}}</span>-->
          </b-col>
          <b-col lg="2">
            <span><i class="fa fa-id-card"> 病历号</i> : {{initialPatient.medicalRecordId}}</span>
          </b-col>
          <b-col lg="2">
            <span><i class="fa fa-user"> 患者姓名</i> : {{initialPatient.patientName}}</span>
          </b-col>
        </b-row>
      </b-card>

</template>

<script>
  import {mapState} from 'vuex';
  import bus from '../../../store/doctorBus.js'
    export default {
      name: "patientInfo",
      data(){
        return{
          initialPatient:{ medicalRecordId: '未选择', patientName: '未选择', calculationTypeId:1},
        }
      },
      mounted:async function () {
        var self = this;
        bus.$on("patientInfo",function(msg){
          self.initialPatient.medicalRecordId = msg[0];
          self.initialPatient.patientName = msg[1];
        })
        await this.initPatient();

      },
      watch:{
        patient:{
          handler() {
            this.initialPatient = this.patient;
          },
        }
      },
      methods:{
        initPatient(){
          this.initialPatient=this.patient;
        }
      }
    }
</script>

<style scoped>

</style>
