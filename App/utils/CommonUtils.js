/**
  公有化工具方法
**/

/*
 返回上一级
*/

import{
  ToastAndroid,
  PixelRatio,
  Dimensions,
} from 'react-native';

export function NaviGoBack(navigator){
  if(navigator && navigator.getCurrentRoutes().length > 1) {
    navigator.pop();
    return true;
  }
  ToastAndroid.show("已经是最后一页!",ToastAndroid.SHORT);
  return false;
};

var Utils = {
  // 单位像素
  pixel:1/PixelRatio.get(),

  size:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  },

// 对于请求的封装
// post
post(url,data,callback) {
    var feachOptions={
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(data),
    };
    fetch(url,fetchOptions)
    .then((response)=>response.text())
    .then((responseText) => {
      callback && callback(JSON.parse(responseText));
    }).catch((error)=>{
      console.log('error='+error);
    });
  },

//get
get(url,callback){
  fetch(url)
  .then((response) => response.text())
  .then((responseText) => {
    callback(JSON.parse(responseText));
  });
}
}

export default Utils;
