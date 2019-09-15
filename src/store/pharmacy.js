export default {
  namespaced:true,
  state:{
    patient:{ medicalRecordId: "未选择", patientName: "未选择", patientGender: '未选择', patientAge: '未选择', calculationTypeId:'未选择' },
  },
  mutations: {
    selectPatient(state, selectedPatient) {
      // console.log(selectedPatient);
      state.patient = selectedPatient;
    },
  }
}
