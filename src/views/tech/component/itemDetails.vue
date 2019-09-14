<template>
  <b-card header="项目明细">
    <b-card>
      <b-table
        show-empty
        hover
        :items="item"
        :fields="itemDetailFields">
      </b-table>
      <div class="pull-right">
        <b-button type="button" variant="secondary" :disabled="isAble" @click="itemRegister" class="mr-1">登记</b-button>
        <b-button type="button" variant="secondary" :disabled="isAble" @click="itemCancel" class="mr-1">取消</b-button>
      </div>
    </b-card>

    <b-card>
      <b-form-group
        label="图片上传"
        :label-cols="2">
        <b-form-file
          v-model="imgFile"
          placeholder="在此录入图片"
          class="mb-2"
          accept=".jpg, .png"
          :disabled="isWrite">
        </b-form-file>
      </b-form-group>

      <b-form-group
        label="检查\检验所见"
        :label-cols="2">
        <b-form-textarea
          id="textareaFindings"
          v-model="findings"
          placeholder="在此填入检查\检验所见"
          rows="3"
          max-rows="6"
          :disabled="isWrite"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group
        label="诊断意见"
        :label-cols="2">
        <b-form-textarea
          id="textarea"
          v-model="results"
          placeholder="在此填入诊断意见"
          rows="3"
          max-rows="6"
          :disabled="isWrite"
        ></b-form-textarea>
      </b-form-group>

      <div class="pull-right">
        <b-button type="button" variant="secondary" :disabled="isEnd" @click="submit" class="mr-1">提交</b-button>
      </div>
    </b-card>

    <b-modal id="submitModal" hide-header>
      <h5>提交成功！</h5>
      <template slot="modal-footer">
        <b-button variant="info" class="mr-1" @click="$bvModal.hide('submitModal')">确定</b-button>
      </template>
    </b-modal>
  </b-card>
</template>

<script>
  import  {mapState, mapMutations} from 'vuex'

  import axios from 'axios';
  export default {
    name: "itemDetails",
    data () {
      return {
        item: [],
        itemDetailFields: [
          {key: 'itemCode', label: '项目编码'},
          {key: 'itemName', label:'项目名称'},
          {key: 'purposeRequirement', label:'目的要求'},
          {key: 'checkSite', label:'检查部位'},
          {key: 'isUrgentStr', label:'是否加急'},
          {key: 'isPayStr', label:'是否缴费'}
        ],
        imgFile: null,
        findings: '',
        results: '',
        isWrite:true,
        isAble: true,
        isEnd: true
      }
    },
    computed:{
      ...mapState('tech', ['techItem']),
      changeData() {
        const {findings, results} = this;
        return {
          findings,
          results
        }
      }
    },
    watch:{
      techItem: {
        handler() {
          // console.log(this.techItem);
          this.item = [];
          this.item.push(this.techItem);
          this.isWrite = true;
          this.imgFile= '';
          this.findings = '';
          this.results = '';
        }
      },
      item: {
        handler() {
          // console.log(this.item[0]);
          if(this.item.length !== 0 && this.item[0].itemState === 0 && this.item[0].isPay === true)
            this.isAble = false;
          else
            this.isAble = true;
        }
      },
      changeData: {
        handler:function(oldval, newval) {
          if(newval.findings !== '' && newval.results !== '')
            this.isEnd = false;
          else
            this.isEnd = true;
        }
      }
    },
    methods:{
      ...mapMutations('tech', ['techItemRegister']),
      ...mapMutations('tech', ['techItemCancel']),
      itemRegister() {
        this.techItemRegister();
        this.isAble = true;
        this.isWrite = false;
      },
      itemCancel() {
        this.techItemCancel();
        this.isAble = true;
      },
      submit() {
        this.$bvModal.show('submitModal');
        this.isWrite = true;
        this.isEnd = true;
        this.isWrite = true;
        this.imgFile= '';
        this.findings = '';
        this.results = '';
      }
    },
  }
</script>

<style scoped>
</style>
