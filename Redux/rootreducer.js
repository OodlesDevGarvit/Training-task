
import UserinformationReducer from "./UserinformationReducer";
import UserlistReducer from "./UserlistReducer";
import { combineReducers } from "redux";



export const rootreducer = combineReducers({
    user : UserinformationReducer,
    item:UserlistReducer
    
})