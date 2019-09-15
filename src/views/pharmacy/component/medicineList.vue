<template>
  <b-card header="门诊发药单">
    <b-row>
      <b-col md="12" class="my-1">
        <div class="pull-right">
          <b-button type="button" variant="secondary" :disabled="isDps" @click="medicineDispense" class="mr-1">发药</b-button>
          <b-button type="button" variant="secondary" :disabled="isRtn" @click="medicineReturn" class="mr-1">退药</b-button>
        </div>
      </b-col>
    </b-row>
    <b-table selectable
             select-mode="multi"
             show-empty
             hover
             :items="filteredItems"
             :fields="medicineField"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :sort-direction="sortDirection"
             @row-selected="selectMedicine">
    </b-table>

    <b-modal id="dpsModal" hide-header>
      <h5>发药成功！</h5>
      <template slot="modal-footer">
        <b-button variant="info" class="mr-1" @click="$bvModal.hide('dpsModal')">确定</b-button>
      </template>
    </b-modal>

    <b-modal id="rtnModal" hide-header>
      <h5>退药成功！</h5>
      <template slot="modal-footer">
        <b-button variant="info" class="mr-1" @click="$bvModal.hide('rtnModal')">确定</b-button>
      </template>
    </b-modal>
  </b-card>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: 'techItemsList',
    inheritAttrs: false,
    data() {
      return {
        items:[
          {medicineRecordId:'001',medicalRecordId: '001',medicineCode:'001',medicineName:'甘草酸二铵肠溶胶囊',format:'50mg*24粒',quantity:1,actualQuantity:1,price:30,totalAmount:30,date:'2019-09-02',state:1},
          {medicineRecordId:'002',medicalRecordId: '001',medicineCode:'002',medicineName:'奥美拉唑肠溶胶囊',format:'20mg*14粒',quantity:1,actualQuantity:1,price:18,totalAmount:18,date:'2019-09-02',state:0},
          {medicineRecordId:'003',medicalRecordId: '001',medicineCode:'003',medicineName:'铝碳酸镁咀嚼片',format:'0.5g*30片',quantity:2,actualQuantity:2,price:42,totalAmount:84,date:'2019-09-02',state:0},
          {medicineRecordId:'004',medicalRecordId: '002',medicineCode:'004',medicineName:'复方环磷酰胺片',format:'50mg*24片',quantity:1,actualQuantity:1,price:80,totalAmount:80,date:'2019-08-30',state:1},
          {medicineRecordId:'005',medicalRecordId: '002',medicineCode:'005',medicineName:'注射用盐酸多柔比星',format:'10mg*1瓶',quantity:1,actualQuantity:1,price:60,totalAmount:60,date:'2019-08-30',state:1},
          {medicineRecordId:'006',medicalRecordId: '003',medicineCode:'006',medicineName:'复方甘草酸苷片',format:'25mg*10片*10板',quantity:1,actualQuantity:1,price:130,totalAmount:130,date:'2019-09-01',state:0},
        ],
        filteredItems:[],
        selectedItems:[],
        medicineField: [
          {key: 'medicineCode', label: '药品代码',sortable: true},
          {key: 'medicineName', label: '药品名称',sortable: true},
          {key: 'format', label: '规格'},
          {key: 'quantity', label: '开立数量',sortable: true},
          {key: 'actualQuantity', label: '实际数量',sortable: true},
          {key: 'price', label: '单价',sortable: true},
          {key: 'totalAmount', label: '总金额',sortable:true},
          {key: 'date', label: '开药时间', sortable: true},
          {key: 'stateStr', label: '发药状态',sortable: true}
        ],
        sortBy: 'medicineCode',
        sortDesc: false,
        sortDirection: 'asc',
        isDps: true,
        isRtn: true,
        isUpdate: false
      }
    },
    computed: {
      ...mapState('tech', ['patient'])
    },
    watch: {
      patient:{
        handler() {
          // console.log(this.patient);
          let selectedPatient = this.patient;
          this.filteredItems = this.items.filter(item => {
            if ( item.medicalRecordId === selectedPatient.medicalRecordId) {
              if (item.state === 1)
                item.stateStr = '已发';
              else if(item.state === 0)
                item.stateStr = '未发';
              else
                item.stateStr = '已退';
              return item
            }
          });
        },
      },
      isUpdate: {
        handler() {
          // console.log(this.items);
          if(this.isUpdate === true)
            this.filteredItems = this.items.filter(item => {
              if ( item.medicalRecordId === this.patient.medicalRecordId) {
                return item
              }
            });
          this.isUpdate = false;
        }
      },
    },
    methods: {
      ...mapMutations("tech", ['selectTech']),
      selectTechItem(item) {
        // console.log(item[0]);
        this.selectTech(item[0]);
      },
      selectMedicine(selectItems) {
        // console.log(items);
        this.selectedItems = selectItems;
        if(selectItems.length === 0) {
          this.isDps = true;
          this.isRtn = true;
          return;
        }

        let dpsItems = 0;
        let rtnItems = 0;
        for(let i=0; i<selectItems.length; i++) {
          if(selectItems[i].state === 0)
            dpsItems++;
          else if(selectItems[i].state === 1)
            rtnItems++;
        }

        if(dpsItems === selectItems.length)
          this.isDps = false;
        else if(rtnItems === selectItems.length)
          this.isRtn =false;
        else {
          this.isDps = true;
          this.isRtn = true;
        }
      },
      medicineDispense() {
        for(let i=0; i<this.selectedItems.length; i++) {
          let record = this.selectedItems[i].medicineRecordId;
          for(let j=0;j<this.items.length; j++) {
            if(this.items[j].medicineRecordId === record) {
              this.items[j].state = 1;
              this.items[j].stateStr = '已发';
              break;
            }
          }
        }
        this.isDps = true;
        this.isUpdate = true;
      },
      medicineReturn() {
        for(let i=0; i<this.selectedItems.length; i++) {
          let record = this.selectedItems[i].medicineRecordId;
          for(let j=0;j<this.items.length; j++) {
            if(this.items[j].medicineRecordId === record) {
              this.items[j].state = 2;
              this.items[j].stateStr = '已退';
              break;
            }
          }
        }
        this.isRtn = true;
        this.isUpdate = true;
      }
    }
  }
</script>
