import React, { Component } from 'react'
import KumoInputBox from '../elements/kumoInputBox';
import KumoButton from '../elements/kumoButton';
import axios from 'axios';
import { throwStatement, tsImportEqualsDeclaration } from '@babel/types';
const discount_add_api = 'http://restaurant.com:5005/discounts/add';
const product_api = 'http://restaurant.com:5005/products/all'
export default class AddItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            promotion: [],
            promo_name: '',
            promo_type: '',
            amount: '',
            prod_id: '',
            start_date: '',
            end_date: '',
            status:false
        }
    }

    componentDidMount() {
        this.Fetchapi();
        
    }
    Fetchapi=()=>{
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        axios.get(product_api,config)
        .then(data=>this.setState({promotion:data.data.result}))
        .catch((err)=>console.log(err))
                
    }
    changeHandlerName = (e) => {
        this.setState({
            promo_name: e.target.value
        })
    }

    changeHandlerType = (e) => {
        this.setState({
            promo_type: e.target.value
        })
    }

    changeHandlerAmount = (e) => {
        this.setState({
            amount: e.target.value
        })
    }

    changeHandlerProduct = (e) => {
        this.setState({
            prod_id: e.target.value
        })
    }

    changeHandlerStart = (e) => {
        this.setState({
            start_date: e.target.value
        })
    }

    changeHandlerEnd = (e) => {
        this.setState({
            end_date: e.target.value
        })
    }

    //Add Promotion
    handleSubmit = () => {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
       const data = {promo_name:this.state.promo_name,promo_type:this.state.promo_type,amount:this.state.amount,prod_id:this.state.prod_id,start_date:this.state.start_date,end_date:this.state.end_date}
        axios
            .post(discount_add_api,data,config)
            .then(response => {
                this.setState({status:true})
                this.Fetchapi()
                console.log(response)
            })
            .then(error => {
                console.log(error)
            })
    }

    render() {
        const { promo_name, promo_type, amount, prod_id, start_date, end_date,promotion,status } = this.state;
        console.log(status)
        return (
            <div className="container-fluid bg-dark p-3">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-4 bg-light p-3">
                        <h3 style={{ textAlign: 'center' }}>Create Promotion</h3>
                        {status&&<div className="alert alert-success">you have sucessfully added promotion product</div>}
                        <form onSubmit={this.handleSubmit}>
                           
                            <div>
                                <label>Promotion Name</label>
                                <KumoInputBox type="text" name="promo_name" onChange={this.changeHandlerName} value={promo_name} placeholder="Enter Promotion Name" />

                                <label>Promotion Type</label>
                                <KumoInputBox text="text" name="promo_type" onChange={this.changeHandlerType} value={promo_type} placeholder="Enter Promotion Type" />

                                <label>Promotion Amount</label>
                                <KumoInputBox text="text" name="amount" onChange={this.changeHandlerAmount} value={amount} placeholder="Enter Promotion Amount" />

                                <label>Promotion Start Date</label>
                                <KumoInputBox type="date" name="start_date" onChange={this.changeHandlerStart} value={start_date} />

                                <label>Promotion End Date</label>
                                <KumoInputBox type="date" name="end_date" onChange={this.changeHandlerEnd} value={end_date} />

                                <label>Product Name</label>
                                <select className="form-control" id="exampleFormControlSelect1"  onChange={this.changeHandlerProduct} value={prod_id}>
                                {promotion.map((promos,key)=>{
                                    return <option key={key} value={promos.id}>{promos.product_name}</option>
                                })}
                                </select>

                                <KumoButton type="submit" className="mt-4" text="Create" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }

}