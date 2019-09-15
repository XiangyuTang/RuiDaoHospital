<template>
  <b-card header="项目列表">
    <b-table selectable
             select-mode="single"
             show-empty
             hover
             :items="filteredItems"
             :fields="itemField"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :sort-direction="sortDirection"
             @row-selected="selectTechItem">
    </b-table>
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
          {itemCode:'001', medicalRecordId:'001', itemName:'普通胃镜', checkSite:'胃部', purposeRequirement:'检查消化道黏膜损伤情况', isUrgent:true, isPay:true, itemState:0},
          {itemCode:'002', medicalRecordId:'001', itemName:'胆囊超声', checkSite:'胆囊', purposeRequirement:'检查胆囊是否存在炎症', isUrgent:false, isPay:true, itemState:1},
          {itemCode:'003', medicalRecordId:'002', itemName:'冰冻切片', checkSite:'乳腺', purposeRequirement:'判断病变良恶性', isUrgent:true, isPay:true, itemState:0},
          {itemCode:'004', medicalRecordId:'003', itemName:'X线胸片', checkSite:'胸腔', purposeRequirement:'检查肺部是否存在炎症', isUrgent:false, isPay:false, itemState:1},
        ],
        filteredItems:[],
        itemField: [
          {key: 'itemCode', label: '项目代码', sortable: true},
          {key: 'itemName', label:'项目名称', sortable:true},
          {key: 'itemStateStr', label:'项目状态'},
        ],
        sortBy: 'itemCode',
        sortDesc: false,
        sortDirection: 'asc',
      }
    },
    computed: {
      ...mapState('tech', ['patient']),
      ...mapState('tech', ['isItemUpdate'])
    },
    watch: {
      patient:{
        handler() {
          // console.log(this.patient);
          let selectedPatient = this.patient;
          this.filteredItems = this.items.filter(item => {
            if ( item.medicalRecordId === selectedPatient.medicalRecordId) {
              if (item.itemState === 1)
                item.itemStateStr = '已登记';
              else if(item.itemState === 0)
                item.itemStateStr = '未登记';
              else
                item.itemStateStr = '已取消';
              if (item.isUrgent === true)
                item.isUrgentStr = '是';
              else
                item.isUrgentStr = '否';
              if (item.isPay === true)
                item.isPayStr = '是';
              else
                item.isPayStr = '否';
              return item
            }
          });
        },
      },
      isItemUpdate: {
        handler() {
          // console.log(this.items);
          if(this.isItemUpdate === true)
            this.filteredItems = this.items.filter(item => {
              if ( item.medicalRecordId === this.patient.medicalRecordId) {
                return item
              }
            });
        }
      },
    },
    methods: {
      ...mapMutations("tech", ['selectTech']),
      selectTechItem(item) {
        // console.log(item[0]);
        this.selectTech(item[0]);
      },
    }
  }
</script>
