
/**
 商品获取网络模拟
**/

import * as types from '../common/ActionTypes';

const initialState = {
  loading:false,
  left_items:[],
  right_items:[],
  data_length:0,
  selectedItem:'',
};

export default function goods(state = initialState,action){
   switch (action.type) {
     case types.FETCH_GOODS_ACTION:
      return Object.assign({},state,{
        loading:true,
      });
    case types.RECEIVE_GOODS_ACTion:
      return Object.assign({},state,{
        loading:false,
        left_items:action.left_items,
        right_items:action.right_items,
        data_length:action.data_length,
        selectedItem:action.selectedItem,
      });
    case types.CHANGE_CATEGORY_ACTION:
      return Object.assgin({},state,{
        selectedItem:action.selectedItem,
      });
     default:
      return state;
   }
};
