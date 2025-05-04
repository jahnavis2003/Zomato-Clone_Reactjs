import { useState } from "react";
import base_url from '../api';
import axios from 'axios';
const Header = (props) =>{
    let [newUser,setNewUser] = useState({
        name: "",
        mobile: "",
        email: "",
        address: "",
        password: "",
    });
    let [login,setLogin] = useState({
        email: "",
        password: "",
    });
    let saveNewUser = async () => {
        try{
            let url = `${base_url}api/create-user-account`;
            let {data} = await axios.post(url, {...newUser});
            alert(data.message);
            if(data.status === true){
                window.location.assign("/");
            }
        } catch(error){
            alert("server error");
        }

    };
    let userLogin = async() => {
        try{
            let url = `${base_url}api/user-login`;
            let {data} = await axios.post(url, {...login});
            alert(data.message);
            if(data.status === true){
                window.location.assign("/");
            }
        } catch(error){
            alert("server error");
        }
    };
    return <>
        <div
            className="modal fade"
            id="modalUserNewAccount"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel2"
            tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalToggleLabel2">
                        Create a new account
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="modal-body">
                <div className="mb-3">
                    <label
                    htmlFor="name"
                    className="form-label"
                    >
                    Full Name
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter full Name"
                    value={newUser.name}
                    onChange={(event) => { setNewUser({...newUser, name: event.target.value}) }}
                    />
                </div>
                <div className="mb-3">
                    <label
                    htmlFor="mobile"
                    className="form-label"
                    >
                    Mobile
                    </label>
                    <input
                    type="number"
                    className="form-control"
                    id="mobile"
                    placeholder="Enter Mobiler Number"
                    value={newUser.mobile}
                    onChange={(event) => { setNewUser({...newUser, mobile: event.target.value}) }}
                    />
                </div>
                <div className="mb-3">
                    <label
                    htmlFor="email"
                    className="form-label">
                    Email
                    </label>
                    <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value={newUser.email}
                    onChange={(event) => { setNewUser({...newUser, email: event.target.value}) }}
                    />
                </div>
                <div className="mb-3">
                    <label
                    htmlFor="address"
                    className="form-label" >
                    Address
                    </label>
                    <textarea
                    className="form-control"
                    id="address"
                    rows="3"
                    value={newUser.address}
                    onChange={(event) => { setNewUser({...newUser, address: event.target.value}) }}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label
                    htmlFor="password"
                    className="form-label"
                    >
                    Enter Password
                    </label>
                    <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter Password"
                    value={newUser.password}
                    onChange={(event) => { setNewUser({...newUser, password: event.target.value}) }}
                    />
                </div>
                </div>
                <div className="modal-footer">
                    <button onClick={saveNewUser} className="btn btn-success" >
                        Create Account
                    </button>
                </div>
            </div>
            </div>
        </div>  
        <div
            className="modal fade"
            id="modalUserLogin"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel2"
            tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalToggleLabel2">
                            Login
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label
                            htmlFor="loginEmail"
                            className="form-label">
                            Email
                            </label>
                            <input
                            type="email"
                            className="form-control"
                            id="loginEmail"
                            placeholder="Enter Email id"
                            value={login.email}
                            onChange={(event) => {setLogin({...login, email: event.target.value})}}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                            htmlFor="loginPassword"
                            className="form-label"
                            >
                            Enter Password
                            </label>
                            <input
                            type="password"
                            className="form-control"
                            id="loginPassword"
                            placeholder="Enter Password"
                            value={login.password}
                            onChange={(event) => {setLogin({...login, password: event.target.value})}}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={userLogin} className="btn btn-success" >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div> 
        <header className={`col-12 m-auto d-flex justify-content-between py-2 ${props.bgColor}`}>
            <p className="logo fs-4 fw-bold text-danger">e!</p>
            <section>
                <button className="btn text-white" data-bs-toggle="modal" data-bs-target="#modalUserLogin">Login</button>
                <button className="btn btn-outline-light"
                data-bs-toggle="modal" data-bs-target="#modalUserNewAccount"> Create An Account</button>
            </section>
        </header>
    </>
};
export default Header;