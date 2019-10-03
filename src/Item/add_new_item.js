import React, { Component } from 'react'
import KumoInputBox from '../elements/kumoInputBox';
import KumoButton from '../elements/kumoButton';
import Axios from 'axios';
import { throwStatement } from '@babel/types';
const add_product_api ='http://restaurant.com:5005/products/add';
const category_api ='http://restaurant.com:5005/category'
class AddItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_name:'',
            category_id:1,
            category_lists:[],
            status:false,
            myImage:null
        }
        this.HandleImage = this.HandleImage.bind(this)
        this.handleValue= this.handleValue.bind(this)
        this.buttonClick = this.buttonClick.bind(this)
        this.handleName=this.handleName.bind(this);
    }
    componentDidMount(){
        this.Fetchapi();
    }
    Fetchapi=()=>{
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        Axios.get(category_api,config)
        .then(data=>this.setState({category_lists:data.data.data}))
        .catch((err)=>console.log(err))
                
    }
    
     handleValue=(e)=>{
        this.setState({category_id: e.target.value });
     }
    
     handleName =(e)=>{
        this.setState({product_name: e.target.value });
     }

    HandleImage = (e) => {
       
       
        this.setState({myImage:e.target.files[0]})
    }

     buttonClick=(e)=>{
       const {product_name,category_id,myImage} = this.state;

       let data = new FormData();
        data.append('product_name', product_name);
        data.append('category_id', category_id);
        data.append('myImage',myImage)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
    
        Axios.post(add_product_api,data,config)
        .then(data=>{
            
            this.setState({myImage:data.data.imageUrl,status:true})
            this.Fetchapi()
        })
        .catch(err=>console.log(err))
    }
     resetFile = (event) => {
        event.preventDefault();
        this.setState({ file: null });
    }

    render() {
        const { product_name, price,category_id,myImage,status,category_lists} = this.state;
        console.log(myImage)
        return (
            <div className="container-fluid bg-dark p-3">
                <div className="row justify-content-center">
                    <div className="col-lg-3 col-md-4 bg-light d-flex align-items-center">
                        <figure className="figure mx-auto">
                            {myImage && (
                                <img className="img-thumbnail" alt="Item" src={myImage}  style={{ width: "100%" }} />
                            )}
                            <figcaption className="figure-caption" style={{ textAlign: 'center' }}>Item Image</figcaption>
                        </figure>
                    </div>

                    <div className="col-lg-4 col-md-4 bg-light p-3">
                        <h3 style={{ textAlign: 'center' }}>Add Item</h3>
                         {status&&<div className="alert alert-success">you have sucessfully added product</div>}
                        <label>Item_Name</label>
                        <KumoInputBox placeholder='ProductName' name="product_name" onChange={this.handleName} value={product_name}/>
                        
                        <label>Category</label>
                        <select className="form-control" id="exampleFormControlSelect1" name="category_id"  onChange={this.handleValue} value={category_id}>
                          {category_lists.map((category,key)=>{
                              return <option key={key} value={category.category_id}>{category.category_lists}</option>
                          })}
                        </select>
                         <label>Image</label><br />
                        <input type="file" onChange={(e)=>this.HandleImage(e)} name="myImage"/>

                        <KumoButton text="Add" className="mt-4" onClick={(e)=>this.buttonClick(e)}></KumoButton>
                    </div>
                </div>
            </div>

        )
    }

}
export default AddItem;