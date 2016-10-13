


/**
  公有化工具方法
**/

/*
 返回上一级
*/
export function NaviGoBack(navigator){
  if(navigator && navigator.getCurrentRoutes() > 1) {
    navigator.pop();
    return true;
  }
  return false;
};
