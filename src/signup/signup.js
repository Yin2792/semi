import React, { Component ,useState} from 'react'
import KumoButton from '../elements/kumoButton'
import { withMedia } from 'react-media-query-hoc';
import KumoInputBox from '../elements/kumoInputBox';
import { Link } from 'react-router-dom';
import { async } from 'q';
const SingningUp = (props)=>{
    const {pwdView,handlePwdView}=props
    const textStyle ={bottom:'-10px',position:'relative',textAlign:'center'}
    const [name,NameInput] = useState();
    const [age,AgeInput] =useState();
    const [password,PasswordInput] =useState();
    const [con_password,ConFirmInput] =useState();
    const [address,AddressInput] =useState();
    const [status,StatusHandle] = useState();
    //api 
    
     const UserChange = (e)=>{
        NameInput(e.target.value);
        }
        const AgeChange = (e)=>{
            AgeInput(e.target.value);
            }
                const PasswordChange = (e)=>{
                    PasswordInput(e.target.value);
                    }
                    const ConFirmChange = (e)=>{
                        ConFirmInput(e.target.value);
                        }
                          const AddressChange = (e)=>{
                              AddressInput(e.target.value);
                          }
                          
      const _handleClick =async e=>{ 
        const data ={name:name,age:age,password:password,con_password:con_password,address:address};
        console.log(data);
          e.preventDefault();
        await fetch('http://localhost:5005/users/add',{
            method:"POST",
            body:JSON.stringify(data),
            headers: {'Content-Type': 'application/json'},
           
          }).then(res=>{
              return res.json();
          }).catch(err=>{
              console.log(err);
          }).then(response=>{
            console.log(response);
            //get string
            switch(response["status"]){
                case 1:const sta_1 = response["message"];
                       StatusHandle(sta_1);
                       break;
                case 2:const sta_2 = response["message"];
                       StatusHandle(sta_2);
                       break;
                default:console.log(response);
            }
        
          })
         
          
          


      }
      console.log(status);
    return (
        <div className='container-fluid' style={{ background: 'linear-gradient(to bottom, #02AAB0 0%, #00CDAC 100%)', height: '100vh' }}>
            <div className='row justify-content-center text-light align-items-center' style={{ height: '100%' }}>
                <div className='col-lg-4 col-md-6 col-10 col-xl-4' >
                    <form>
                        <div className='d-flex flex-column align-items-center' >
                            <div style={{ width: 70, height: 70, borderRadius: '50%', border: '2px solid white', textAlign: 'center', color: 'white'}}><span><i className="fa fa-user fa-3x"></i></span></div>
                            <h2 className='p-3'>User Login</h2>
                        </div>

                        <label style={{ fontSize: '1.2rem' }} >User Name</label>
                        <KumoInputBox type='text' className='form-control mb-3' onChange={UserChange} name="name"  placeholder='User Name'/>
                        {status==1?<small style={{color:"red"}}>{status}</small>:" "}
                        <label style={{ fontSize: '1.2rem' }} >Age</label>
                        <KumoInputBox type='number' className='form-control mb-3' onChange={AgeChange} name="age" placeholder='User Name'/>
                        {status==1?<small style={{color:"red"}}>{status}</small>:" "}
                        <label style={{ fontSize: '1.2rem' }} >Password</label>
                         <div className='w-100 mb-4'>
                          <KumoInputBox type={pwdView?'text':'password'} className='form-control' onChange={PasswordChange} name="password" placeholder='Password'  />
                          <span onClick={handlePwdView} style={{cursor:'pointer',float:'right',marginTop:'-40px',color:'silver',marginRight:'20px',fontSize:'16pt'}}>{pwdView ?<i className="fa fa-eye" ></i>:<i className="fa fa-eye-slash"></i>}</span>
                          <div>{status==1?<small style={{color:"red"}}>{status}</small>:" "}</div>
                       </div>
                        <label style={{ fontSize: '1.2rem' }} >Confirm passoword</label>
                        <div className='w-100 mb-4'>
                          <KumoInputBox type={pwdView?'text':'password'} className='form-control'  placeholder='Password' onChange={ConFirmChange} name="con_password"/>
                          <span onClick={handlePwdView} style={{cursor:'pointer',float:'right',marginTop:'-40px',color:'silver',marginRight:'20px',fontSize:'16pt'}}>{pwdView ?<i className="fa fa-eye" ></i>:<i className="fa fa-eye-slash"></i>}</span>
                          {status==1?<h5 style={{color:"red"}}>{status}</h5>:<h5 style={{color:"red"}}>{status}</h5>}
                        </div>
                        <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Address</label>
                       <textarea className="form-control rounded-0" id="exampleFormControlTextarea1" rows="5" onChange={AddressChange} name="address" ></textarea>
                       {status==1?<h5 style={{color:"red"}}>{status}</h5>:" "}
                       </div>
                        <KumoButton                        
                            type='submit'
                            text='SingUp'                            
                            style={{ height: 50 }}
                            onClick={_handleClick}
                        />
                       <p style={textStyle}>Already Signed In <Link to="/login" style={{textDecoration:'none'}} >
                     SIGNUP
                    </Link> </p>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default withMedia(SingningUp)
