import React,{Component} from 'react';
import { axios } from "axios";
const tblapi = 'http://restaurant.com:5005/tablelists'
export default class Tables extends Component{
constructor(props){
    super(props)
    this.state ={
      tablelists:[],
      message:true
     
    }
    this.HandleClick = this.HandleClick.bind(this);
}
componentDidMount(){

    fetch(tblapi)
      .then(res => res.json())
      .then(
        data => this.setState({ tablelists: data }),
        error => this.setState({ error })
      )


}
HandleClick = (e)=>{
    e.preventDefault()
   window.location.href='/ordermenu'
   this.setState({message:true})
}
render(){
    const {tablelists,message} = this.state
    console.log(this.state.tablelists)
    {
    
       return(
           <div className="row p-3">
               
           {tablelists.map((value,key)=>{
            return <div className="col-sm-6 col-lg-3 p-3" key={key}>
                <div className="card bg-light" style={{ borderTopLeftRadius: 20, borderBottomRightRadius: 20 }}>
                <div className="card-body text-center">
                    <h4>Table No</h4>
                   <a onClick={this.HandleClick}><label >{value.table_no}</label></a>
                   {message?<div className="alert alert-success">available</div>:<div className="alert alert-danger">unvailable</div>}
                </div>
            </div>
        </div>

           })}
           
            </div>
       )
    }
}




}