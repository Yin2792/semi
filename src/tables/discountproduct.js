import React,{Component} from 'react';
import { axios } from "axios";
import OrderedValue from './orderedvalue';
const discount_api = 'http://localhost:5005/products/discount'
export default class DiscountProduct extends Component{
constructor(props){
    super(props)
    this.state ={
      discount_lists:[],
      key:1,
      inputQty:[]
     
    }
    this.HandleClick = this.HandleClick.bind(this);
}
componentDidMount(){

    fetch(discount_api)
      .then(res => res.json())
      .then(
        data =>
        this.setState({ discount_lists: data.data,amount:data.data}),
        error => this.setState({ error })
      )


}
HandleClick = (e,index)=>{
      this.setState({key:index})
}
HandleKey = (i, e) => {
  this.setState({
      inputQty: { ...this.state.inputQty, [i]: e.target.value }
  });
}
render(){
    const {discount_lists,key,inputQty} = this.state;
    const discount=discount_lists[key];
    return (
        <div className="container-fluid">
        <div className="row pb-1">
        {discount_lists.length>0?discount_lists.map((products, key) =>{
            const ori_price = products.price;
            const dis = parseInt(products.amount,10)*ori_price/100;
            const sales_price = ori_price -dis;
            const last =sales_price*inputQty[key]
        return <div className="col-xs-6 col-sm-4 col-md-2 col-lg-3" key={key} >
          <div className="card mt-1" style={{ textAlign: 'center', padding: 10, background: '#f9f2ec' }}>
            <img className="img-thumbnail" src={require('../image/drink/peach_pineapple.jpg')} alt='Product' />
            <div className="card-body">
              <label><b>Name:</b> {products.product_name}</label><br />
              <label><b>Type:</b> {products.category_lists}</label><br />
              <label><b>Price:</b>{sales_price}</label>
              <label><b>Quantity:</b>
              <input
                type="text"
                className="form-control"
                value={inputQty[key]}
                onChange={(e) => this.HandleKey(key, e)} />
                </label><br />
                 <label><b>Total Price:</b>{last}</label>
            </div>
            <button type="button" className="btn btn-outline-success" onClick={((e)=>this.HandleClick(e,key))}>Order</button>
          </div>
        </div>
      }):<h3 style={{color:"white"}}></h3>}
         <OrderedValue discountvalue={discount}></OrderedValue>
        </div>
        
        </div>
        
      )
}




}