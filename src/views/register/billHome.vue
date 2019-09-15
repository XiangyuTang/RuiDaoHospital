<template>
  <div class="animated fadeIn">
    <b-col>
      <b-col>
        <BillTable
          @refresh="refresh"
          :caption="'费用项目信息'"
          :initial-fields="expenseItemsFields"
          :per-page="10"
          :expense-items-list-for-patient="expenseItemsListForPatient"
        >
        </BillTable>
      </b-col>
    </b-col>
  </div>
</template>

<script>
  import RegisterTable from "./component/registerTable";
  import BillTable from "./component/billTable";
  export default {
    name: "billHome",
    components:{RegisterTable,BillTable},
    data: () => {
      return{

        expenseItemsFields: [
          //是药品就显示药品名 是非药品就显示非药品名  如何实现？ 插槽？
          {
            key: 'expenseItemsName',
            sortable: true,
            label: '缴费单号'
          },
          {
            key: 'quantity',
            sortable: true,
            label: '病历号'
          },
          //缴费时 实际肯定=开立（缴费前改处方 直接废除 开新的） 退费时检查 开立-实际
          {
            key: 'actualQuantity',
            sortable: true,
            label: '患者姓名'
          },
          {
            key: 'totalCost',
            sortable: true,
            label: '花费'
          },
          {
            key: 'expenseType.expenseTypeName',
            sortable: true,
            label: '开立时间'
          },
          {
            key: 'payStatus',
            sortable: true,
            label: '发票状态'
          },
        ],
        registrationList: [],
        expenseItemsList: [],
        expenseItemsListForPatient: [],
      }
    },
    mounted: async function(){
      // this.$store.commit('common/set_curr_user_type', 'register');
      await this.getRegistrationList();
      await this.getExpenseItemsList();
    },
    methods:{
      getRegistrationList(){
        console.log("请求挂号列表");
        this.$get('registration/showRegistration').then((res)=> {
          if(res.status === 'OK'){
            this.registrationList = res.data;
          }else{
            console.log("加载挂号列表失败");
          }
        })
      },
      getExpenseItemsList(){
        this.$get('registration/getAllExpenseItems').then((res)=> {
          console.log(res.data);
          if(res.status === 'OK'){
            this.expenseItemsList = res.data;
          }else{
            console.log("加载费用项目列表失败");
          }
        })
      },
      showExpenseItems(medicalRecordId){
        //每次改变选择时，清空患者费用项目列表，重新赋值
        this.expenseItemsListForPatient = [];
        if (medicalRecordId != null){
          let that = this;
          this.expenseItemsList.forEach(function (expenseItems) {
            if (expenseItems.medicalRecordId === medicalRecordId){
              //此处是否使用深拷贝？
              that.expenseItemsListForPatient.push(expenseItems);
            }
          })
        }
      },
      refresh(){
        this.getExpenseItemsList();
      },
    }
  }
</script>

<style scoped>

</style>
