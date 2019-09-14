<template>
  <b-card header="患者列表">
    <b-row>
      <b-col sm="8" class="my-1">
        <b-input-group>
          <b-form-input
            v-model="filter"
            placeholder="请输入..."
            size="sm"
          ></b-form-input>
          <b-input-group-append>
            <b-button
              :disabled="!filter"
              @click="filter = ''"
              size="sm"
            >
              清空
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <b-col sm="4" class="my-1">
        <b-form-select
          v-model="perPage"
          :options="pageOptions"
          size="sm"
        ></b-form-select>
      </b-col>
    </b-row>

    <!-- 列表内容 -->
    <b-table
      selectable
      select-mode="single"
      show-empty
      hover
      :aria-busy="isBusy"
      :items="filteredItems"
      :fields="patientsFields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @row-selected="selectPatientItem"
    >
    </b-table>

    <!--分页器-->
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
  </b-card>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "patientsList",
    data() {
      return {
        isBusy: false,
        items: [
          { medicalRecordId: '001', patientName: '小张', patientGender: 0, patientAge: 18, calculationTypeId: 1},
          { medicalRecordId: '007', patientName: '小唐', patientGender: 1, patientAge: 30, calculationTypeId: 1},
          { medicalRecordId: '004', patientName: '小余', patientGender: 1, patientAge: 28, calculationTypeId: 0},
          { medicalRecordId: '002', patientName: '小王', patientGender: 1, patientAge: 31, calculationTypeId: 0},
          { medicalRecordId: '008', patientName: '小赵', patientGender: 1, patientAge: 22, calculationTypeId: 1},
          { medicalRecordId: '006', patientName: '小陈', patientGender: 0, patientAge: 14, calculationTypeId: 0},
          { medicalRecordId: '003', patientName: '小李', patientGender: 1, patientAge: 25, calculationTypeId: 1},
          { medicalRecordId: '005', patientName: '小孙', patientGender: 1, patientAge: 17, calculationTypeId: 1},
        ],
        patientsFields: [
          { key: 'medicalRecordId', label: '病历号', sortable: true },
          { key: 'patientName', label: '姓名', sortable: true }
        ],
        perPage: 5,
        pageOptions: [5, 10, 15],
        currentPage: 1,// currentPage:1 表示当前页码为1
        sortBy: 'medicalRecordId',
        sortDesc: false,
        sortDirection: 'asc',
        filter: ''
      }
    },
    computed: {
      filteredItems() {
        console.log(this.items);
        return this.items.filter(item => {
          if (item.patientGender === 0)
            item.patientGenderStr = '男';
          else
            item.patientGenderStr = '女';
          if (item.calculationTypeId === 0)
            item.calculationType = '现金';
          else
            item.calculationType = '支付宝';
          if ( (item.medicalRecordId.indexOf(this.filter) !== -1) || (item.patientName.indexOf(this.filter) !== -1)) {
            return item
          }
        })
      },
      total: function () {
        return this.filteredItems.length
      }
    },
    methods: {
      // 选择单个患者
      selectPatientItem(patient) {
        // console.log(patient);
        this.selectPatient(patient[0]);
      },
      ...mapMutations("tech", ['selectPatient'])
    }
  }
</script>

<style scoped>

</style>
