<template>
  <b-card>
    <div slot="header">
      挂号
    </div>
    <div>
      <span style="font-style: italic"><strong>患者信息</strong></span>
      <b-button class="pull-right" type="reset"  variant="danger" @click="reset"><i class="fa fa-ban"></i> 清空</b-button>
      <b-button class="pull-right" type="submit"  variant="primary" @click="submit"><i class="fa fa-dot-circle-o"></i> 挂号</b-button>

    </div>
    <br/>
    <div style="background:linear-gradient(to left,#efefef,#b6b6b6);height:1px;"></div>
    <br/>

      <b-col md="1">
        <b-button variant="outline-Dark" class="btn btn-outline-dark btn-block" @click="getPatient">身份证读卡</b-button>
      </b-col>
     <br/>

    <b-form>
      <b-row>
        <b-col md="3">
          <b-form-group
            description=""
            label="身份证号"
            label-for="patientIdentity"
            :label-cols="2"
            :horizontal="true">
            <b-form-input  v-model="patient.patientIdentity" id="patientIdentity" type="text" placeholder="请输入患者身份证号"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group
            description=""
            label="患者姓名"
            label-for="patientName"
            :label-cols="2"
            :horizontal="true">
            <b-form-input  v-model="patient.patientName" id="patientName" type="text" autocomplete="name" placeholder="请输入患者姓名"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="3">
        <b-form-group
          description=""
          label="家庭住址"
          label-for="homeDress"
          :label-cols="2"
          :horizontal="true">
          <b-form-input  v-model="patient.homeDress" id="homeDress" type="text" autocomplete="dress" placeholder="请输入患者家庭住址"></b-form-input>
        </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="3">
          <b-form-group
          description=""
          label="患者性别"
          label-for="xingBie"
          :label-cols="2"
          :horizontal="true">
          <b-form-input  v-model="patient.xingBie" id="xingBie" type="text" autocomplete="xingBie" disabled = "disabled"></b-form-input>
        </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group
            description=""
            label="患者年龄"
            label-for="age"
            :label-cols="2"
            :horizontal="true">
            <b-form-input  v-model="patient.age" id="age" type="text" autocomplete="age"  disabled = "disabled"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group
            description=""
            label="出生日期"
            label-for="birthday"
            :label-cols="2"
            :horizontal="true">
            <b-form-input  v-model="patient.birthday" id="birthday" type="text" autocomplete="birthday"  disabled = "disabled"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <div>
        <span style="font-style: italic"><strong>挂号信息</strong></span>
      </div>
      <br/>
      <div style="background:linear-gradient(to left,#efefef,#b6b6b6);height:1px;"></div>
      <br/>

      <b-row>
        <b-col md="3">
          <b-form-group
            label="选择科室"
            label-for="selectDepartment"
            :label-cols="2"
            :horizontal="true">
            <b-form-select id="selectDepartment"
                           size="lg"
                           :plain="true"
                           v-model="registration.departmentId">
              <option v-for="department in departmentList" :key="department.departmentId" :value="department.departmentId" :label="department.departmentName"></option>
            </b-form-select>
          </b-form-group>
        </b-col>
          <b-col md="3">
          <b-form-group
            description="选填"
            label="选择医生"
            label-for="selectDoctor"
            :label-cols="2"
            :horizontal="true">
            <b-form-select id="selectDoctor"
                           size="lg"
                           :plain="true"
                           v-model="registration.doctorId">
              <option v-for="doctor in this.doctorListByDepartmentId(registration.departmentId)" :key="doctor.userId" :value="doctor.userId" :label="doctor.userName"></option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="3">
          <b-form-group
            label="结算类别"
            label-for="calculationType"
            :label-cols="2"
            :horizontal="true">
            <b-form-select id="selectCalculationType"
                           size="lg"
                           :plain="true">
              <option>自费</option>
              <option>医保</option>
              <option>社保</option>
            </b-form-select>
          </b-form-group>
        </b-col>
          <b-col md="3">
          <b-form-group
            label="挂号级别"
            label-for="registrationLevel"
            :label-cols="2"
            :horizontal="true">
            <b-form-radio-group
              id="registrationLevel"
              name="registrationLevel">
              <b-form-select id="selectRegistrationLevel"
                             size="lg"
                             :plain="true">
                <option>普通</option>
                <option>专家</option>
                <option>特需</option>
               </b-form-select>
            </b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form-group
            label="是否购买病历本?"
            label-for="buyMedical"
            :label-cols="2"
            :horizontal="true">
            <b-form-radio-group
              id="buyMedical"
              name="customRadioInline1">
              <div class="custom-control custom-radio custom-control-inline">
                <input v-model="registration.buyMedicalRecord" type="radio" id="yes" name="customRadioInline1" class="custom-control-input" value="1" checked>
                <label class="custom-control-label" for="yes">是</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input v-model="registration.buyMedicalRecord" type="radio" id="no" name="customRadioInline1" class="custom-control-input" value="2">
                <label class="custom-control-label" for="no">否</label>
              </div>
            </b-form-radio-group>
          </b-form-group>
        </b-col>

      </b-row>
      <div>
        <span style="font-style: italic"><strong>挂号缴费</strong></span>
      </div>
      <br/>
      <div style="background:linear-gradient(to left,#efefef,#b6b6b6);height:1px;"></div>
      <br/>
      <b-row>
      <b-col md="3">
        <b-form-group
          description=""
          label="应收金额"
          label-for="ymoney"
          :label-cols="2"
          :horizontal="true">
          <b-form-input  v-model="patient.ymoney" id="ymoney" type="text" autocomplete="ymoney"  disabled = "disabled"></b-form-input>
        </b-form-group>
      </b-col>
        <b-col md="3">
          <b-form-group
            description=""
            label="实收金额"
            label-for="smoney"
            :label-cols="2"
            :horizontal="true">
            <b-form-input  v-model="patient.smoney" id="smoney" type="text" autocomplete="smoney"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group
            description=""
            label="找零金额"
            label-for="zmoney"
            :label-cols="2"
            :horizontal="true">
            <b-form-input  v-model="patient.zmoney" id="money" type="text" autocomplete="zmoney"  disabled = "disabled"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
    <RegisterModal   @register="register" :total-cost="totalCost">
    </RegisterModal>
  </b-card>
</template>

<script>
    import RegisterModal from "./registerModal"
    export default {
        name: "registerForm",
        components:{RegisterModal},
        props: {
          departmentList: {
            type: [Array, Object],
            default: () => []
          },
          doctorList: {
            type: [Array, Object],
            default: () => []
          },
          patientList: {
            type: [Array, Object],
            default: () => []
          },
        },
        data: () => {
            return{
              patient: {
                patientName:'',
                patientGender: '1',
                patientBirth: '2019-06-29',
                patientIdentity: '',
              },
              registration: {
                registrationLevelId: 1,
                departmentId: 1,
                calculationTypeId: 1,
                //doctorId可谓不填项，则insertSelective不更新
                doctorId: null,
                buyMedicalRecord: 1,
                registrationStatus: 1,
              },
              medicalRecord: {
                //后端拼写错误 用Treament
                isTreamentOver: 1,
              },
              expenseItems: {
                payStatus: 1,
              },
              totalCost: 0,
            }
          },
      computed:{
        idState(){
          return this.patient.patientIdentity.length === 18;
        },
        nameState(){
          return this.patient.patientName.length > 1;
        },
        doctorListByDepartmentId(){
          // let ds = this.doctorList.filter(doctor => {if(doctor.departmentId === departmentId) return true;});
          // if(ds.length > 0) return ds[0].text;
          // else return "未知";
          return function(departmentId) {
            let ds = this.doctorList.filter(doctor => {if(doctor.department.departmentId === departmentId) return true;});
            return ds;
          };
        },
      },
      methods:{
        getPatient(){
          let ds = this.patientList.filter(patient => {if(patient.patientIdentity === this.patient.patientIdentity) return true;});
          if(ds.length > 0) {
            this.patient = JSON.parse(JSON.stringify(ds[0]));
          }
          else {
            alert("此患者尚未在本医院就诊过！");
          }
        },
        checkForm(){
          return this.idState && this.nameState;
        },
        submit:(async function () {
          //检查表单是否填充 身份证号18位且名字处长度大于1
          if(this.checkForm()){
            await this.getRegistrationCost();
            this.$bvModal.show('registerModal');
          }
          else{
            alert("患者信息部分填写尚不完善，请正确填写");
          }
        }),
        reset(){
          //初始化 若全部置为空对象会报错
          this.patient = {
            patientName:'',
            patientGender: '',
            patientBirth: '2019-06-29',
            patientIdentity: '',
          };
          this.registration = {
            registrationLevelId: 1,
            departmentId: 1,
            calculationTypeId: 1,
            //doctorId可谓不填项，则insertSelective不更新
            doctorId: null,
            buyMedicalRecord: 1,
            registrationStatus: 1,
          };
        },
        getRegistrationCost:(function () {
           this.$get('registrationLevel/getRegistrationLevelById', {"id": this.registration.registrationLevelId}).then((res) => {
            if (res.status === 'OK') {
              this.totalCost = parseFloat(res.data.registrationCost) + parseFloat(this.registration.buyMedicalRecord);
            } else {
              console.log("挂号失败");
            }
          })
        }),
        register(payModeId){
          this.$post('registration/register', {"registration": this.registration, "patient": this.patient, "medicalRecord": this.medicalRecord, "expenseItems": this.expenseItems, "userId": this.$store.state.register.cashier.userId, "payModeId": payModeId}).then((res) => {
            if (res.status === 'OK') {
              alert("挂号成功！");
              payModeId = 51;
              //改变父组件props属性 破坏了单项数据流
              //改变自身数据
              this.totalCost = 0;
              this.reset();
              //刷新左侧挂号信息表格
              this.$emit('refresh');
            } else {
              alert("挂号失败！");
            }
          })
        }
      },
    }
</script>

<style scoped>

</style>
