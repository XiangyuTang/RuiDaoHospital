<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <b-card>
          <b-row>
            <b-col md="3" class="my-1">
              <b-form-group label-cols-sm="3" label="查询" class="mb-0">
                <b-input-group>
                  <b-form-input v-model="filter" placeholder="请输入..."></b-form-input>
                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''">清空</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col md="9" class="my-1">
              <div class="pull-right">
                <b-button variant="secondary" @click="$bvModal.show('medicineInsertModal')" class="mr-1">添加</b-button>
                <b-button variant="secondary"  @click="$bvModal.show('medicineEditModal')" class="mr-1" :disabled = 'isEdit'>编辑</b-button>
              </div>
            </b-col>
          </b-row>
          <b-table selectable
                   select-mode="multi"
                   show-empty
                   hover
                   :items="filteredItems"
                   :fields="catalogFields"
                   :filter="filter"
                   :current-page="currentPage"
                   :per-page="perPage"
                   :sort-by.sync="sortBy"
                   :sort-desc.sync="sortDesc"
                   @row-selected="selectItem" >
          </b-table>

          <b-row>
            <b-col md="3" class="my-1">
              <div class="pull-left">
                <b-button variant="danger" @click="deleteItems" class="mr-1"  :disabled = 'isDelete'>批量删除</b-button>
              </div>
            </b-col>
            <b-col md="6" class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="total"
                :per-page="perPage"
                class="my-0"
                size="sm"
                align="center"
              ></b-pagination>
            </b-col>
            <b-col md="3" class="my-1">
              <div class="pull-right">
                <b-button variant="info" @click="$bvModal.show('inputModal')" class="mr-1">导入</b-button>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-modal id="medicineInsertModal">
      <template slot="modal-header">
        <h5>添加药品</h5>
      </template>
      <b-form novalidate>
        <b-form-group v-for="field in catalogFields"
                      :key="field.key"
                      :label-for="field.label"
                      :label="field.label">
          <b-form-input type="text"
                        class="form-control-success"
                        :id="field.label"
                        v-model="insertedItem[field.key]">
          </b-form-input>
        </b-form-group>
      </b-form>
      <template slot="modal-footer">
        <b-button variant="info" class="mr-1" @click="insertItem">确定</b-button>
        <b-button variant="secondary" class="mr-1" @click="$bvModal.hide('medicineInsertModal')">取消</b-button>
      </template>
    </b-modal>

    <b-modal id="medicineEditModal">
      <template slot="modal-header">
        <h5>编辑药品</h5>
      </template>
      <b-form novalidate>
        <b-form-group v-for="field in catalogFields"
                      :key="field.key"
                      :label-for="field.label"
                      :label="field.label">
          <b-form-input type="text"
                        class="form-control-success"
                        :id="field.label"
                        v-model="selectedItem[field.key]">
          </b-form-input>
        </b-form-group>
      </b-form>
      <template slot="modal-footer">
        <b-button variant="info" class="mr-1" @click="editItem">确定</b-button>
        <b-button variant="secondary" class="mr-1" @click="$bvModal.hide('medicineEditModal')">取消</b-button>
      </template>
    </b-modal>

    <b-modal id="inputModal">
      <template slot="modal-header">
        <h5>导入药品清单</h5>
      </template>
      <b-form-file
        v-model="listFile"
        placeholder="请选择文件..."
        class="mb-2"
        accept=".xlsx">
      </b-form-file>
      <template slot="modal-footer">
        <b-button variant="info" class="mr-1" @click="$bvModal.hide('inputModal')">确定</b-button>
        <b-button variant="secondary" class="mr-1" @click="$bvModal.hide('inputModal')">取消</b-button>
      </template>
    </b-modal>

    <b-modal id="insertModal" hide-header>
      <h5>添加成功！</h5>
      <template slot="modal-footer">
        <b-button variant="info" class="mr-1" @click="$bvModal.hide('insertModal')">确定</b-button>
      </template>
    </b-modal>

    <b-modal id="editModal" hide-header>
      <h5>修改成功！</h5>
      <template slot="modal-footer">
        <b-button variant="info" class="mr-1" @click="$bvModal.hide('editModal')">确定</b-button>
      </template>
    </b-modal>

    <b-modal id="deleteModal" hide-header>
      <h5>删除成功！</h5>
      <template slot="modal-footer">
        <b-button variant="info" class="mr-1" @click="$bvModal.hide('deleteModal')">确定</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: "catalogue",
    data(){
      return{
        catalogFields:[
          {key: 'medicineCode', label: '药品编码', sortable: true},
          {key: 'medicineName', label: '药品名称', sortable: true},
          {key: 'format',label: '规格', sortable: true},
          {key: 'price', label: '单价', sortable: true},
          {key: 'manufacturer', label: '生产厂家', sortable: true},
          {key: 'medicineType', label:'药品类型', sortable: true},
          {key: 'medicineForm', label:'药品剂型', sortable: true}
        ],
        items:[
          {medicineCode:'001',medicineName:'注射用甲氨喋呤',format:'1g*1支',price:'15.73',manufacturer:'山西普德药业有限公司',medicineType:'西药',medicineForm:'针剂'},
          {medicineCode:'002',medicineName:'氟康唑氯化钠注射液（大扶康）',format:'200mg*100ml/瓶',price:'7.01',manufacturer:'安徽环球药业股份有限公司',medicineType:'西药',medicineForm:'针剂'},
          {medicineCode:'003',medicineName:'50%葡萄糖注射液（塑瓶）',format:'10.20ml*1支',price:'25.16',manufacturer:'河南科伦药业有限公司',medicineType:'西药',medicineForm:'针剂'},
          {medicineCode:'004',medicineName:'盐酸特比萘芬泡腾片（丁克）',format:'50mg*7片/盒',price:'40.62',manufacturer:'齐鲁制药有限公司',medicineType:'西药',medicineForm:'片剂'},
          {medicineCode:'005',medicineName:'红芪',format:'10g*1袋',price:'30.79',manufacturer:'安徽新兴中药材有限公司',medicineType:'中草药',medicineForm:'中药饮片'},
          {medicineCode:'006',medicineName:'盐酸安酮戊酸散（外用）',format:'118mg*1瓶',price:'19.51',manufacturer:'上海复旦张江生物医药股份有限公司',medicineType:'西药',medicineForm:'散剂'},
          {medicineCode:'007',medicineName:'盐酸美金刚片（易贝申）',format:'10mg*28片/盒',price:'22.05',manufacturer:'丹麦灵北药厂',medicineType:'西药',medicineForm:'片剂'},
          {medicineCode:'008',medicineName:'磷酸奥司他韦胶囊（达菲）',format:'75mg*10粒/盒',price:'60.96',manufacturer:'上海罗氏制药有限公司',medicineType:'西药',medicineForm:'胶囊'},
          {medicineCode:'009',medicineName:'泽泻颗粒',format:'1g/10g/袋',price:'0.09',manufacturer:'广州今典精方药业有限公司',medicineType:'中成药',medicineForm:'颗粒剂'},
          {medicineCode:'010',medicineName:'山药颗粒',format:'0.5g/10g/袋',price:'6.79',manufacturer:'京源中药饮片有限公司',medicineType:'中成药',medicineForm:'颗粒剂'},
        ],
        selectedItems:[],
        selectedItem:{},
        insertedItem:{},
        listFile:null,
        perPage:8,
        currentPage:1,
        filter:'',
        sortBy: 'medicineCode',
        sortDesc: false,
        isEdit: true,
        isDelete: true,
        isUpdate: false
      }
    },
    computed: {
      filteredItems() {
        console.log(this.items);
        return this.items.filter(item => {
          if ( (item.medicineCode.indexOf(this.filter) !== -1) || (item.medicineName.indexOf(this.filter) !== -1)) {
            return item
          }
        })
      },
      total: function () {
        return this.filteredItems.length
      },
      isUpdate: {
        handler() {
          // console.log(this.items);
          if (this.isUpdate === true)
            this.filteredItems = this.items.filter(item => {
              if ((item.medicineCode.indexOf(this.filter) !== -1) || (item.medicineName.indexOf(this.filter) !== -1)) {
                return item
              }
            });
          this.isUpdate = false;
        }
      }
    },
    methods: {
      selectItem(medicineItems) {
        console.log(medicineItems);
        this.selectedItems = medicineItems;

        if(medicineItems.length === 1) {
          this.selectedItem = medicineItems[0];
          this.isEdit = false;
        } else
          this.isEdit = true;

        if(medicineItems.length === 0)
          this.isDelete = true;
        else
          this.isDelete = false;
      },
      insertItem() {
        this.items.push(this.insertedItem);
        this.isUpdate = true;
        this.$bvModal.hide('medicineInsertModal');
        this.$bvModal.show('insertModal');
      },
      editItem() {
        this.isUpdate = true;
        this.$bvModal.hide('medicineEditModal');
        this.$bvModal.show('editModal');
      },
      deleteItems() {
        for(let i=0; i<this.selectedItems.length; i++) {
          let record = this.selectedItems[i].medicineCode;
          this.items.some((item, i) => {
            if(item.medicineCode === record)
              this.items.splice(i,1);
          })
        }
        this.isUpdate = true;
        this.$bvModal.show('deleteModal');
      }
    }
  }
</script>

<style scoped>

</style>
