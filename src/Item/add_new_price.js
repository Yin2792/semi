import React, { Component } from 'react';
import KumoInputBox from '../elements/kumoInputBox';
import axios from 'axios';
const price_api ='http://restaurant.com:5005/prices'
export default class Menu_List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prices:[]
    }
    this.handleClick=this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch(price_api)
      .then(res => res.json())
      .then(
        data => this.setState({ prices: data.result }),
        error => this.setState({ error })
      )
  }
  handleClick=(e,value)=>{
    e.preventDefault();
    console.log(value);
    const id=value
    const price_by_id_api =`http://restaurant.com:5005/prices/remove/${id}`;
   axios.put(price_by_id_api,{
     method:"PUT",
     headers: {
      'content-type': 'application/json'
    },
   })
   .then(response => {
    console.log(response)
  })
  .then(error => {
    console.log(error)
  })
  }
  // changeHandler = (e) => {
  //   this.setState({ category_lists: e.target.value })
  // }

  // //Add Price
  // handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log(this.state)
  //   axios
  //     .post('http://restaurant.com:5005/add/price',
  //       {
  //         category_lists: this.state.category_lists
  //       })
  //     .then(response => {
  //       console.log(response)
  //     })
  //     .then(error => {
  //       console.log(error)
  //     })
  // }


  //Remove Category List


  render() {
    
    const {prices} = this.state
    console.log(prices);

    return (
      <div className='bg-light p-1 m-2'>
        <h2>Price List</h2>

        <form className="form-inline" onSubmit={this.handleSubmit}>
          <label>Price</label>&nbsp;
          <input type="text"
            name="category_lists"
    
            onChange={this.changeHandler}
            placeholder="Enter New Price"
          /> &nbsp;
          <button type="submit" className="btn btn-outline-info" >Add New</button>
        </form>

        <div className="table-responsive pt-2">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                
                <th>{"Prices"}</th>
                <th>{"Update"}</th>
                <th>{"DELETE"}</th>
              </tr>
            </thead>
              <tbody>
                {prices.map((price,key)=>{
                  return <tr key={key}>
                  <td>{price.price}</td>
                  <td><i className="fa fa-edit" data-toggle="modal" data-target="#myModal"/></td>
                  <td><i className="fa fa-trash-o" onClick={((e) => this.handleClick(e,price.price_id))}></i></td>
                  </tr>
                })}
              </tbody>
           
          </table>

          {/* The Modal */}
          <div className="modal fade" id="myModal">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Edit Price</h4>
                  <button type="button" className="close" data-dismiss="modal">×</button>
                </div>

                <div className="modal-body">

                  <label>Price</label>
                  <KumoInputBox/>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Update</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
