
/**
 * 顶部导航/标题栏
 */

import React,{Component} from 'React';
import {
Text,
View,
} from 'react-native';


class HeadView extends React.Component {
  constructor(props){
    super(props);
  }

  static get defaltProps(){
    return{
      title:'aaa'
    };
  }

  render(){
    return(
      <View style={{flex:1}}>
        <Text style={{color:'black',fontSize:20}}>
          标题栏 : {this.props.title}
        </Text>
      </View>
    );
  }
};
export default HeadView;
