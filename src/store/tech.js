export default {
  namespaced:true,
  state:{
    patient:{ medicalRecordId: "未选择", patientName: "未选择", patientGender: '未选择', patientAge: '未选择', calculationTypeId:'未选择' },
    techItem: {},
    isItemUpdate: false
  },
  mutations:{
    selectPatient(state, selectedPatient) {
      // console.log(selectedPatient);
      state.patient = selectedPatient;
    },
    selectTech(state, selectedItem) {
      // console.log(selectedItem);
      state.techItem = selectedItem;
      state.isItemUpdate = false;
    },
    techItemRegister(state) {
      state.techItem.itemState = 1;
      state.techItem.itemStateStr = '已登记';
      state.isItemUpdate = true;
    },
    techItemCancel(state) {
      state.techItem.itemState = 2;
      state.techItem.itemStateStr = '已取消';
      state.isItemUpdate = true;
    }
  },
  action:{

  }
}
