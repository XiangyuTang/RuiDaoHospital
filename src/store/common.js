export default {
  namespaced:true,
  state:{
    curr_user_type:'',
    curr_user_id:1,
    curr_user:"哈哈哈",
    curr_role:"emm",
    curr_dept:"adkja",
  },
  mutations:{
    set_curr_user_type(state, user_type){
      state.curr_user_type = user_type
    },
    set_curr_user(state, user) {
      state.curr_user = user
    },
    set_curr_user_id(state, user_id){
      state.curr_user_id = user_id
    },
    set_curr_dept(state, curr_dept){
      state.curr_dept = curr_dept
    },
    set_curr_role(state, curr_role){
      state.curr_role = curr_role
    }
  }
}
