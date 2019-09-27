import React, { Component } from 'react';
import axios from 'axios'
const price_api='http://restaurant.com:5005/prices'
class Price extends Component {
    constructor(props){
        super(props)
        this.state={
            price_lists:null

        }
    }
    componentDidMount(){
     this.price();
    }
    price= ()=>{
        axios.get(price_api,{
            method:"get"
          })
          .then(data=>{this.setState({price_lists:data.data.data})})
         .catch((err)=>console.log(err))
    }
    render() {
        console.log(this.state.price_lists);
        return (
            <div className='bg-light p-1 m-2'>
                <h3>Price</h3>
                <div className="table-responsive">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>{"Price ID"}</th>
                                <th>{"Price"}</th>
                                <th>{"Update"}</th>
                                <th>{"DELETE"}</th>
                            </tr>

                        </thead>
                        <tbody className="table-secondary">
                            
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Price;