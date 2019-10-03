import React,{Component} from 'react';
import { axios } from "axios";

export default class OrderedValue extends Component{
constructor(props){
    super(props)
    this.state ={
        values:null,
        last_price:0
    }
}
componentDidMount(){



}

render(){
    console.log(this.props.last_price);
 return(
     <div>
         <h4>hello</h4>
     </div>
 )

}




}