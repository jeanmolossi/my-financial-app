import { AppActions, AppState } from "./types";

export const INITIAL_STATE: AppState =  {
  status: null,
  message: undefined
};

export function appReducer(state: AppState, action: AppActions){
  switch(action.type) {
    case '@app/UPDATE_REQUEST_STATUS': {
      const { payload } = action;
      
      const { status, message } = payload;

      return {
        status,
        message
      };
    }
    default: return state;
  }
}