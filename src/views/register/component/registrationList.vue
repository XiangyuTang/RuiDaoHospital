<template>
  <b-card header="患者列表" >
    <div slot="header">
      <strong>患者列表</strong>
    </div>
    <div >
      <b-card class="mb-3 text-center" no-body >
        <b-row >
          <b-col >
            <span><i class="fa fa-user"> 已选患者</i> : {{selectedPatient?selectedPatient:'暂无'}}</span>
            &nbsp;&nbsp;
            <span><a href="#" @click.prevent="refresh"><i class="fa fa-refresh fa-fw"></i></a></span>
           </b-col >


        </b-row>
      </b-card>
    </div>
    <b-tabs @input="changeTab">
      <!-- changeTab更换tab 个人/科室挂号列表 -->
      <b-tab v-for="(tab, index) in registrationTabs" :title="tab.title" :key="index" :active="index === currentTab" >
      <!-- 分别存放tab的内容-->
        <b-row>
          <b-col sm="12" class="my-1">
            <b-input-group>
              <b-form-input
                v-model="filter"
                placeholder="请输入患者病历号"
                size="sm"
              ></b-form-input>
              <b-input-group-append>
                <b-button
                  :disabled="!filter"
                  @click="filter = ''"
                  size="sm"
                >
                  清空</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </b-row>
        <br>
        <div role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block href="#" v-b-toggle.accordion-1 variant="info"><font color="aliceblue">未诊患者</font></b-button>
            </b-card-header>
            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-table
                  selectable
                  select-mode="single"
                  show-empty
                  hover
                  :aria-busy="isBusy"
                  :items="items"
                  :fields1="registrationFields"
                  :current-page="currentPage"
                  :per-page="perPage"
                  :filter="filter"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  :sort-direction="sortDirection"
                  @filtered="onFiltered"
                  @row-selected="selectPatient">
                  <!-- @filtered当本地筛选导致项目数发生变化时发出。-->
                  <!-- 自定义诊断的展示格式 -->
                  <template slot="medicalRecordState" slot-scope="row">
                    {{transformMedicalRecordState(row.item)}}
                  </template>
                </b-table>
                <!--页码-->
                <b-row>
                  <b-col md="12" class="my-1">
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="total"
                      :per-page="perPage"
                      class="my-0"
                      size="sm"
                      align="center"
                    ></b-pagination>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block href="#" v-b-toggle.accordion-2 variant="info"><font color="aliceblue">已诊患者</font></b-button>
            </b-card-header>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                  <b-table
                    selectable
                    select-mode="single"
                    show-empty
                    hover
                    :aria-busy="isBusy"
                    :items="items1"
                    :fields1="registrationFields"
                    :current-page="currentPage"
                    :per-page="perPage"
                    :filter="filter"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :sort-direction="sortDirection"
                    @filtered="onFiltered"
                    @row-selected="selectPatient">
                    <!-- @filtered当本地筛选导致项目数发生变化时发出。-->
                    <!-- 自定义诊断的展示格式 -->
                    <template slot="medicalRecordState" slot-scope="row">
                      {{transformMedicalRecordState(row.item)}}
                    </template>
                  </b-table>
                  <!--页码-->
                  <b-row>
                    <b-col md="12" class="my-1">
                      <b-pagination
                        v-model="currentPage"
                        :total-rows="total1"
                        :per-page="perPage"
                        class="my-0"
                        size="sm"
                        align="center"
                      ></b-pagination>
                    </b-col>
                  </b-row>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
        <!-- Main table element -->
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
  import {mapState,mapMutations} from 'vuex';
  import bus from '../../../store/doctorBus.js';
    export default {
      name: "registrationList",
      inject:["reload"],
      data() {
        return {
          curr_user:{medicalRecordId:'001',userId:'001',patientGender : '男'},
          selectedPatient:null,
          isBusy: false,
          items:[],//未诊
          items1:[],//已诊
          total:1,//未诊
          total1:1,//已诊
          perPage: 5,
          pageOptions: [5, 10, 15],
          currentPage:1,// currentPage:1 表示当前页码为1
          currentTab:0,//  currentTab:0表示个人挂号列表
          sortBy: null,
          sortDesc: false,
          sortDirection: 'asc',
          filter: null,
          registrationTabs:[{//tabs定义挂号列表的状态是个人还是科室的挂号列表
            title:"个人",
            getRegistrationApi:"/doctor/common/listRegistrationFromUserByUserId",
            getRegistrationParams:{},
            getChangeRegistrationApi:"/doctor/common/changePatientFromUser",
            getChangeRegistrationParams:{},
          },{
            title:"科室",
            getRegistrationApi:"/doctor/common/listRegistrationFromDepartmentByUserId",
            getRegistrationParams:{},
            getChangeRegistrationApi:"/doctor/common/changePatientFromDepartment",
            getChangeRegistrationParams:{},
          }],
          registrationFields: [
            {key: 'medicalRecordId', label: '病历号', sortable: true},
            {key: 'patient.patientName', label: '姓名', sortable: true},
            // {key: 'medicalRecordState', label:'状态', sortable: true},
          ],
        }
      },
      mounted: async function(){//挂载之后才开始填充数据
        console.log("mounted");
        await this.getPatientList();
        console.log("await this.getPatientList");
      },
      computed:{
        ...mapState('doctor',['medicalRecordState']),
        ...mapState('common',["curr_user"]),
      },
      methods:{
        ...mapMutations('doctor',['updateMedicalRecordState']),
        ...mapMutations('doctor',['updateRegistration']),
        ...mapMutations('doctor',['updatePatient']),

        transformMedicalRecordState(item){//更新就诊状态
          let currentMedicalRecord = item.medicalRecord;
          let currentMedicalRecordState ='';
          if(currentMedicalRecord.isTreamentOver==='1'){//未诊毕
            if(currentMedicalRecord.firstDiagnosisDoctorId!==null){//未初诊
              if(currentMedicalRecord.finalDiagnosisDoctorId!==null){
                currentMedicalRecordState =  '已确诊';
              }else{
                currentMedicalRecordState = '已初诊';
              }
            }else{
              currentMedicalRecordState = '未初诊';
            }
          }else{
            currentMedicalRecordState = '诊毕';
          }
          return currentMedicalRecordState;
        },
        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.total = filteredItems.length;
          this.currentPage = 1;
        },
        selectPatient(patient) {//选择一个患者
          console.log(patient);
          let data = this.registrationTabs[this.currentTab].getChangeRegistrationParams;
          console.log("患者列表");
          //console.log(patient[0].姓名);
          this.selectedPatient = patient[0].姓名;
          data.medicalRecordId = patient[0].病历号;
          data.userId = this.curr_user.userId;
          console.log(data);

          bus.$emit("patientInfo",[patient[0].病历号,patient[0].姓名,"1","已诊"])

          // this.$get(this.registrationTabs[this.currentTab].getChangeRegistrationApi, data).then(res=>{
          //   console.log(res);
          //   if(res.status === "OK"){
          //     console.log(patient[0]);
          //     this.isBusy = false;
          //     this.updateMedicalRecordState(this.transformMedicalRecordState(patient[0]));//更新就诊状态
          //     this.updateRegistration(patient[0]);
          //     //更新已选择的状态   用于显示
          //     let selectedPatientItems = {};
          //     selectedPatientItems.calculationTypeId = patient[0].calculationTypeId;//转义结算类别
          //     selectedPatientItems.patientGender = patient[0].patient.patientGender;//获得性别
          //     selectedPatientItems.medicalRecordId = patient[0].medicalRecordId;//病历ID
          //     selectedPatientItems.patientName = patient[0].patient.patientName;//名字
          //     selectedPatientItems.medicalRecordState = this.medicalRecordState;//诊断状态
          //     this.updatePatient(selectedPatientItems);//更新vuex中的patient对象
          //     this.$emit('selectPatient', patient[0]);
          //   }else{
          //     alert("切换失败");
          //     console.log("加载失败");
          //   }
          // });
          this.isBusy = false;

          patient[0].calculationTypeId = 1;
          patient[0].medicalRecordId = patient[0].病历号;
          patient[0].patientName = patient[0].姓名;
          this.medicalRecordState = '1';
          console.log('hahahahah:'+patient[0]);
          this.updateMedicalRecordState(this.transformMedicalRecordState(patient[0]));//更新就诊状态
          this.updateRegistration(patient[0]);
          //更新已选择的状态   用于显示
          let selectedPatientItems = {};
          selectedPatientItems.calculationTypeId = patient[0].calculationTypeId;//转义结算类别
          selectedPatientItems.patientGender = patient[0].patient.patientGender;//获得性别
          selectedPatientItems.medicalRecordId = patient[0].medicalRecordId;//病历ID
          selectedPatientItems.patientName = patient[0].patientName;//名字
          selectedPatientItems.medicalRecordState = this.medicalRecordState;//诊断状态
          this.updatePatient(selectedPatientItems);//更新vuex中的patient对象
          this.$emit('selectPatient', patient[0]);
        },
        async changeTab(index){
          this.currentTab = index;
          await this.getPatientList();//串行：等待前面一个await执行后接着执行下一个await
        },
        getPatientList(){
          console.log("请求患者列表");
          let data = this.registrationTabs[this.currentTab].getRegistrationParams;
          console.log(data);
          //this.curr_user.userId = 1;
          this.registrationTabs[this.currentTab].getRegistrationParams.userId = this.curr_user.userId;
          // this.$get(this.registrationTabs[this.currentTab].getRegistrationApi, data).then(res=>{
          //   console.log(res);
          //   if(res.status === "OK"){
          //     this.items = res.data;//填充患者列表数据
          //     this.total = this.items.length;//得到当前的总数
          //     this.isBusy = false;
          //   }else{
          //     console.log("加载失败");
          //   }
          // });
          //未诊患者名单
          this.items = [{'病历号':'20190828001','姓名':'何清权'},{'病历号':'20190828002','姓名':'王演'},
                        {'病历号':'20190828003','姓名':'宋捷'}];
          this.total = this.items.length;
          //已诊患者名单
          this.items1 = [{'病历号':'20190829001','姓名':'黄方'},{'病历号':'20190829002','姓名':'霍飞'},
                        {'病历号':'20190829003','姓名':'冯水'},{'病历号':'20190829004','姓名':'张弛'},
                       {'病历号':'20190829005','姓名':'何甜甜'},{'病历号':'20190829006','姓名':'康有'},
                       {'病历号':'20190829007','姓名':'刘严飞'}];
          this.total1 = this.items1.length;

          this.isBusy = false;
        },
        refresh(){
          this.reload();
        }
      }
    }
</script>

<style scoped>

</style>
