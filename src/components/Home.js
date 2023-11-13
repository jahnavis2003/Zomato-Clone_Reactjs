import {useEffect} from "react";
import { useState } from "react";
import axios from 'axios';
// import { getLocationList } from "";
import {useNavigate} from "react-router-dom";
const Home = () => {
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
    let userLogin = async() => {
        try{
            let url = `http://localhost:3030/api/user-login`;
            let {data} = await axios.post(url, {...login});
            alert(data.message);
            console.log(data);
            if(data.status === true){
                window.location.assign("/");
            }
        } catch(error){
            alert("server error");
        }
    };
    let saveNewUser = async () => {
        try{
            let url = `http://localhost:3030/api/create-user-account`;
            let {data} = await axios.post(url, {...newUser});
            alert(data.message);
            if(data.status === true){
                window.location.assign("/");
            }
        } catch(error){
            alert("server error");
        }

    };
    let [mealTypes,setMealTypes]=useState([]);
    let [placeHolderText,setPlaceHolderText] = useState("Get a location");
    let [locations,setLocations] = useState([]);
    let [restaurantList,setRestaurantList] = useState([]);
    //create instance of navigate
    let navigate =  useNavigate();
    let getMealTypes = async()=>{
        
       try {
         let url = `http://localhost:3030/api/get-meal-type-list`;
        let response = await fetch(url, {method:`GET`});
        let data = await response.json();
        // console.log(data);
        setMealTypes(data.result);}
        catch(error){
            alert("Server Error");
        }
    };
    let getLocationList = async()=>{
       try
       { setPlaceHolderText('Getting location list... ');
       setRestaurantList([]);
        let url = `http://localhost:3030/api/get-locations-list`;
        let response = await fetch(url, {method:"GET"});
        let data = await response.json();
        setLocations(data.result);
        setPlaceHolderText("Here is location list");}
        catch(error){
            setPlaceHolderText("Failed to get location, try again");
        }
    };

    let getRestaurantListByLocationId = async(id,name,city) => {
        try{
            let url = `http://localhost:3030/api/get-restaurant-list-by-location-id/${id}`;
            let response = await fetch(url, {method: "GET"});
            let data = await response.json();
            console.log(data);
            if(data.result.length===0){
                alert("NO restaurants availabe at this location");
            }
            setPlaceHolderText(`${name}, ${city}`);
            setLocations([]);
            setRestaurantList(data.result);
        }
        catch(error){
            console.log(error);
        }
    };
    //call api on load
    //mounting
    useEffect(()=>{
        getMealTypes();
    },[]);
    // console.log(mealTypes);
    return (<> 
    
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
        <main>
            <section className="row main-section ">
                <header className="col-12 my-3 px-4 d-flex justify-content-end">
                    <section>
                        <button className="btn text-white" data-bs-toggle="modal" data-bs-target="#modalUserLogin">Login</button>
                        <button className="btn btn-outline-light"
                        data-bs-toggle="modal" data-bs-target="#modalUserNewAccount">Create an account</button>
                    </section>       
                </header>
                <section className="col-12 d-flex flex-column align-items-center text-white">
                    <p className="brand display-3 fw-bold m-4">e!</p>
                    <p className="fw-bold  h2 m-2  d-none d-lg-flex d-md-flex">Find the best restaurants, cafés, and bars</p>
                    <p className="fw-bold  h2 m-2 d-lg-none d-md-none d-sm-flex">Find the best restaurants,</p>
                    <p className="fw-bold  h2 m-2 d-lg-none d-md-none d-sm-flex">cafés, and bars </p>
                    <section className="d-lg-flex d-md-flex">
                        <section className="bg-white m-2 p-2 location-list ">
                            <input  className="  border-0  input bg-white" type="text" placeholder={placeHolderText}
                            readOnly
                            onFocus={getLocationList} id=""
                            /*onBlur = {()=> setLocations([])}*/ />
                            
                            <ul className="list-group w-100">
                                {locations.map((loc) => {
                                    return(
                                        <li className="list-group-item" 
                                            onClick={()=> getRestaurantListByLocationId(loc.location_id, loc.name, loc.city)} 
                                            key={loc._id}>
                                            {loc.name},{loc.city}
                                        </li>
                                    )
                                })}
                               
                            </ul>
                        </section>
                        <section className="bg-white m-2 p-2 location-list">
                            <span>
                                <i className="fa fa-search search-icon text-black" aria-hidden="true"></i>
                            </span>
                            <input  className="border-0 rounded-0  input" type="text" placeholder="Search for restaurants" readOnly id=""/>
                            <ul className="list-group ">
                                {restaurantList.map((restaurant) => {
                                    return(
                                        <li className="list-group-item" 
                                            key={restaurant._id} onClick={() => navigate('/restaurant/'+ restaurant._id)}>
                                            <img className="me-2" src={`/images/${restaurant.image}`} alt="" style={{width:"40px", height:"40px", borderRadius:"20px"}}/>{restaurant.name},{restaurant.city}
                                        </li>
                                    )
                                })}
                               
                            </ul>
                        </section>
                    </section>
                </section>
            </section>
            <section className="pt-4 m-auto col-10 ">
                <section>
                    <h4 className="fw-bold">Quick Search</h4>
                    <p className="text-muted mb-5"> Discover restaurants by type of meal</p>
                </section>
                <section  className="d-flex  flex-wrap  justify-content-between">
                    { mealTypes.map((value,index)=>{
                        return(
                            <span onClick={()=>navigate(`/Search/${value.meal_type}/${value.name}`)} key={value._id} className="d-flex boxes  mb-3" >
                                <div >
                                    <img src={`/images/${value.image}`} alt=""/>
                                </div>
                                <section className="p-4">
                                    <h5 className="fw-bold">{value.name}</h5>
                                    <p className="text-muted ">{value.content}</p>
                                </section>
                            </span>
                        );
                    })}
                </section>
            </section>
        </main>
     </>);
};

export default Home;