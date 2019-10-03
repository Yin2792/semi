import React, { Component } from 'react';
import axios from 'axios';
const category_name_lists_api ='http://restaurant.com:5005/category/name'
class FoodGallery extends Component {
  constructor(props){
    super(props);
    this.state ={
      name_lists:[],
      lists:[]
    
    }
    this.handleClick=this.handleClick.bind(this);
  }
 componentDidMount(){
 this.getByname()
  }

  getByname=()=>{
    axios.get(category_name_lists_api)
    // .then(r =>console.log({r}))
   .then(data=>{this.setState({name_lists: data.data.data})})
  .catch(function (error) {
   console.log(error);
   });
 
  }
  handleClick=(e,value)=>{
    e.preventDefault();
    const id=value
    const lists_by_id_api =`http://restaurant.com:5005/category/lists?id=${id}`;
    axios.get(lists_by_id_api)
   .then(data=>{this.setState({lists:data.data.data})})
  .catch((err)=>console.log(err))
  }
  render() {
    console.log(this.state.lists)
    return (
  
      <div className="container-fluid">
      <div className="row" style={{marginTop:'20px'}}>
        <div className="col-sm-4">
        <ul className="list-group">
          {this.state.name_lists.map((lists,key)=>{
             return <li className="list-group-item " key={key}  onClick={((e) => this.handleClick(e,lists.category_id))}>{lists.category_lists}</li>
          })}
    
        </ul>
        </div>
        <div className="col-sm-8">
          <div className="row">
             <div className="column">
             
               {this.state.lists.map((value,key)=>{
                      return <div className="card" style={{width:'250px',marginTop:'10px'}} key={key}>
                     <img className="card-img-top"src={require('../image/dessert/chocolate.jpg')}  alt="Card image" style={{width:'100%'}}></img>
                     <div className="card-body">
                    <h4 className="card-title">{value.product_name}</h4>
                   <p className="card-text">Price:{value.price}</p>
                      </div>
                      </div>
                 
               })}

            
             
             </div>
          </div>

        </div>
      </div>
      </div>
     
    )
  }
}

export default FoodGallery;