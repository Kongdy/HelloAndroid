/**
  公有化工具方法
**/

/*
 返回上一级
*/

import{
  ToastAndroid,
} from 'react-native';

export function NaviGoBack(navigator){
  if(navigator && navigator.getCurrentRoutes().length > 1) {
    navigator.pop();
    return true;
  }
  ToastAndroid.show("已经是最后一页!",ToastAndroid.SHORT);
  return false;
};
