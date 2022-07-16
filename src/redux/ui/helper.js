export const uiConstantsMaker = (str)=>{
  return {             
      REQUEST_UPDATE: str + "_REQUEST_UPDATE",
      SUCCESS: str + "_SUCCESS",
      FAILURE: str + "_FAILURE",
  };
}

export const uiActionMaker = (action) => { 
  return  { ...action, type: action.cons.REQUEST_UPDATE };  
}

export const uiReducerMaker = (cons, state, action) => {
  if(action.type===cons.SUCCESS){
      return {
        ...state,
        ...action
      }    
  }
  return state;  
}