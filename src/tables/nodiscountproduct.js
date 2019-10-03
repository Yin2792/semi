import React, { Component } from 'react';
import { axios } from "axios";
import OrderedValue from './orderedvalue';
import {Service} from '../_service/service';

const nodiscount_api = 'http://restaurant.com:5005/products/nodiscount'

export default class NoDiscountProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nodiscount_lists: [],
            key: 1,
            price: 0,
            inputQty:[],
            imageUrl:null
        

        }
        this.HandleClick = this.HandleClick.bind(this);
        this.HandleKey = this.HandleKey.bind(this);
    
    }
    componentDidMount() {

        fetch(nodiscount_api)
            .then(res => res.json())
            .then(
                
            data=>(this.setState({nodiscount_lists:data.data[0]})),
            err=>(this.setState({err}))
                
            )
            


    }
    
    
    HandleClick = (e) => {      
        this.setState({ inputQty: [] })
        Service.valueLists()
    }
    HandleKey = (i, e) => {
        this.setState({
            inputQty: { ...this.state.values, [i]: e.target.value }
        });
    }
    render() {
        const { nodiscount_lists, key, inputQty,imageUrl } = this.state;
        console.log(imageUrl)
        const discount = nodiscount_lists[key];
        return (
            <div className="container-fluid">
                <div className="row pb-1">
                    {
                        nodiscount_lists.map((products, key) => {
                            console.log('http://localhost:5005/public/image/'+products.product_image)
                            const last = inputQty[key] === undefined ? 0 : products.price * inputQty[key]
                            return <div className="col-xs-6 col-sm-4 col-md-2 col-lg-3" key={key} >
                                <div className="card mt-1" style={{ textAlign: 'center', padding: 10, background: '#f9f2ec' }}>'
                            <img className="img-thumbnail" alt='Product' src={`http://localhost:5005/public/image/${products.product_image}`}/>
                                    <div className="card-body">
                                        <label><b>Name:</b> {products.product_name}</label><br />
                                        <label><b>Type:</b> {products.category_lists}</label><br />
                                        <label><b>Price:</b>{products.price}</label>
                                        <br></br>
                                        <label><b>Quantity:</b>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={inputQty[key]}
                                                onChange={(e) => this.HandleKey(key, e)} />
                                        </label><br />

                                        <label><b>Total Price:</b>{last}</label>
                                    </div>
                                    <button type="button" className="btn btn-outline-success" onClick={this.HandleClick}>Order</button>
                                </div>
                            </div>
                        })
                    }
                    <OrderedValue nodiscountvalue={discount} last_price={inputQty}></OrderedValue>
                </div>

            </div>

        )
    }




}