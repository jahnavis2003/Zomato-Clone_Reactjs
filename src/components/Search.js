import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import base_url from '../api';

const Search = () => {
    let navigate = useNavigate();
    let {meal_id, meal_type_name} = useParams();
    let [locations,setLocations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    let [restaurantList, setRestaurantList] = useState([]);
    let [filterOptions, setFilterOptions] = useState({
        meal_type: meal_id,
        startIndex: 0,
        endIndex: 1,
    });
    let getLocationList = async()=>{
        try
        { 
         let url = `${base_url}api/get-locations-list`;
         let response = await fetch(url, {method:"GET"});
         let data = await response.json();
         setLocations(data.result);
         }
         catch(error){
             
         }
     };

    const getFilterData = async()=>{
        let url = `${base_url}api/filter`;
        let {data} = await axios.post(url, {...filterOptions});
        console.log("API Response:", data);
        setRestaurantList(data.result);
        setTotalPages(data.endIndex);    
    }

    const getPages = () => {
        const pageButtons = [];
        for (let i = 1; i <= totalPages; i++) {
          pageButtons.push(
            <button key={i} onClick={() => handlePageChange(i)}>
              {i}
            </button>
          );
        }
        return pageButtons;
      };

    const handlePageChange = (page) => {
        console.log("Page changed to:", page);
        filter("page", null, null, null, page);
        setCurrentPage(page);
    };
    
    const itemsPerPage = 2;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage - 1;
    const filter = async (type, event, lcost, hcost, page) => {
        let { value } = event.target;
        switch (type) {
            case "loc":
                if(value === ""){
                    delete filterOptions.location;
                }
                else {
                    filterOptions["location"] = value;
                }
                break;
            case "sort":
                filterOptions["sort"] = value;
                break;
            case "cuisine":
                if(event.target.checked === true){
                    if(filterOptions["cuisine_id"] !== undefined){ 
                        let isIncluded = filterOptions["cuisine_id"].includes(Number(value))
                        if(isIncluded === false){
                            filterOptions["cuisine_id"] = [...filterOptions["cuisine_id"], Number(value)];
                        } 
                    }
                    else{
                        filterOptions["cuisine_id"] = [Number(value)];
                    }
                    
                } else {
                    let cuisine = filterOptions["cuisine_id"].filter((id)=> Number(value) !== id);
                    if(cuisine.length === 0) {
                        delete filterOptions.cuisine;
                    } else {
                        filterOptions["cuisine_id"] = [...cuisine]
                    }
                }
                console.log(filterOptions["cuisine_id"]);
                break;
            case "cost":
                filterOptions["hcost"] = hcost;
                filterOptions["lcost"] = lcost;
                break;
            case "page":
                if (value >= 1) {
                    setCurrentPage(value);
                    return;
                }
                // let startIndex = (value - 1) * 2;
                // // let endIndex = startIndex + 1;
                // let endIndex = Math.min(startIndex + 1, restaurantList.length - 1);
                // filterOptions["startIndex"] = startIndex;
                // filterOptions["endIndex"] = endIndex;
                // // setCurrentPage(value);
                // setFilterOptions({ ...filterOptions, startIndex, endIndex });
                break;
            default:
                break;
        }
        setFilterOptions({ ...filterOptions });
        // let currPage = page;
    };
    
    useEffect(() => {
        getLocationList();
    }, []);
    useEffect(() => {
        getPages();
    }, [currentPage]);
    useEffect(() => {
        getFilterData();
    }, [filterOptions]);
    return <>     
        <body className="bg-light">
            <main>
                <section className="row bg-danger justify-content-center">
                    <Header bgColor="bg-danger" />
                </section>
                <section className="row">
                    <section className="col-11 m-auto col-md-11 col-lg-10">
                        <p className="my-3 fw-bold fs-2">{meal_type_name} Places Nearby</p>
                        <section className="row gap-5">
                            <section className="col-lg-3 col-md-4 col-12 shadow bg-white p-2 px-3">
                                <p className="fw-bold mb-2 d-none d-lg-flex d-md-flex">Filters</p>
                                <p className="fw-bold mb-2 d-lg-none d-md-none d-flex justify-content-between" data-bs-toggle="collapse" data-bs-target="#search">
                                    <span>Filter/Sort</span>
                                    <span className="fa fa-eye"></span>
                                </p>
                                <aside id="search" className="collapse d-lg-block d-md-block"/>

                                <div>
                                    <label htmlFor="" className="form-label fw-bold text-primary">Select Location</label>
                                    <select name="" id="" className="form-select rounded-0" onChange={(event)=>filter("loc", event)}>
                                        <option value="">Select </option>
                                        {
                                            locations.map((loc)=> {
                                                return <option key = {loc._id} value={loc.location_id}>
                                                    {loc.name}, {loc.city}
                                                </option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="my-2">
                                    <label className="form-label fw-bold text-primary">Cuisine</label>
                                    <div className="form-check ms-2">
                                        <input type="checkbox" value={1} onChange={(event)=>filter("cuisine", event)} className="form-check-input" />
                                        <label htmlFor="" className="form-check-label">North Indian</label>
                                    </div>
                                    <div className="form-check ms-2">
                                        <input type="checkbox" value={2} onChange={(event)=>filter("cuisine", event)} className="form-check-input" />
                                        <label htmlFor="" className="form-check-label">South Indian</label>
                                    </div>
                                    <div className="form-check ms-2">
                                        <input type="checkbox" value={3} onChange={(event)=>filter("cuisine", event)} className="form-check-input" />
                                        <label htmlFor="" className="form-check-label">Chineese</label>
                                    </div>
                                    <div className="form-check ms-2">
                                        <input type="checkbox" value={4} onChange={(event)=>filter("cuisine", event)} className="form-check-input" />
                                        <label htmlFor="" className="form-check-label">Fast Food</label>
                                    </div>
                                    <div className="form-check ms-2">
                                        <input type="checkbox" value={5} onChange={(event)=>filter("cuisine", event)} className="form-check-input" />
                                        <label htmlFor="" className="form-check-label">Street Food</label>
                                    </div>
                                </div>

                                <div className="my-2">
                                    <label className="form-label fw-bold text-primary">Cost for Two</label>
                                    <div className="form-check ms-2">
                                        <input type="radio" name="costForTwo" className="form-check-input" onChange={(event)=>filter("cost", event, 0, 500)}/>
                                        <label htmlFor="" className="form-check-label">Less than ₹ 500</label>
                                    </div>
                                    <div className="form-check ms-2">
                                        <input type="radio" name="costForTwo" className="form-check-input" onChange={(event)=>filter("cost", event, 500, 1000)}/>
                                        <label htmlFor="" className="form-check-label">₹ 500 to ₹ 1000</label>
                                    </div>
                                    <div className="form-check ms-2">
                                        <input type="radio" name="costForTwo" className="form-check-input" onChange={(event)=>filter("cost", event, 1000, 1500)}/>
                                        <label htmlFor="" className="form-check-label">₹ 1000 to ₹ 1500</label>
                                    </div>
                                    <div className="form-check ms-2">
                                        <input type="radio" name="costForTwo" className="form-check-input" onChange={(event)=>filter("cost", event, 1500, 2000)}/>
                                        <label htmlFor="" className="form-check-label">₹ 1500 to ₹ 2000</label>
                                    </div>
                                    <div className="form-check ms-2">
                                        <input type="radio" name="costForTwo" className="form-check-input" onChange={(event)=>filter("cost", event, 2000, 10000)}/>
                                        <label htmlFor="" className="form-check-label">₹ 2000+</label>
                                    </div>
                                </div>

                                <div className="my-2">
                                    <label className="form-label fw-bold text-primary">Sort</label>
                                    <div className="form-check ms-2">
                                        <input type="radio" name="sort" className="form-check-input" value="1" onChange={(event) => filter("sort", event)}/>
                                        <label htmlFor="" className="form-check-label">Price low to high</label>
                                    </div>
                                    <div className="form-check ms-2">
                                        <input type="radio" name="sort" className="form-check-input" value="-1" onChange={(event) => filter("sort", event)} />
                                        <label htmlFor="" className="form-check-label ">Price high to low</label>
                                    </div>
                                </div>

                            </section>
                            <section className="col-lg-8 col-md-7 col-12 px-0 px-lg-2 px-md-2">
                                {
                                    restaurantList.length>0?
                                        restaurantList && restaurantList.map((restaurant,index) => {
                                            if (
                                                index >= filterOptions.startIndex &&
                                                index <= filterOptions.endIndex
                                              ) {
                                                    return (
                                                        <section className="shadow bg-white p-3 px-4 mb-3" key={restaurant._id} onClick={() => navigate('/restaurant/'+ restaurant._id)}>
                                                            <section className="d-flex gap-3 align-items-center" >
                                                                <img src="/images/bakery.jpg" alt="" className="restaurant-image"/>
                                                                <section>
                                                                    <p className="fs-3 fw-bold text-dark-blue">{restaurant.name}</p>
                                                                    <p className="fw-bold text-dark-blue">{restaurant.locality}</p>
                                                                    <p className="text-muted">{restaurant.locality}, {restaurant.city}</p>
                                                                </section>
                                                            </section>
                                                            <hr />
                                                            <section className="d-flex gap-5">
                                                                <section className="text-muted">
                                                                    <p>CUISINES:</p>
                                                                    <p>COST FOR TWO:</p>
                                                                </section>
                                                                <section className="text-dark-blue">
                                                                    <p>
                                                                        {
                                                                            restaurant.cuisine.map((value,index) =>{
                                                                                return value.name
                                                                            }).join(", ")
                                                                        }
                                                                    </p>
                                                                    <p>₹{restaurant.min_price}</p>
                                                                </section>
                                                            </section>
                                                        </section>
                                                    )
                                                }
                                                return null;
                                            })
                                    : <div style={{position: 'relative'}}><div className="text-danger text-center my-5 No-Results">No Results Found</div></div>
                                }
                                <section>
                                    <ul className="list-unstyled d-flex justify-content-center gap-4 zomato-paging"> 
                                        <button onClick={(event) => filter("page", event, 0, 500)}>
                                            <span className="fa fa-angle-left"></span>
                                        </button>
                                        {
                                            Array.from({ length: totalPages }, (_, index) => (
                                                <button
                                                  key={index + 1}
                                                  onClick={() => filter("page", { target: { value: index + 1 } })}
                                                >
                                                  {index + 1}
                                                </button>
                                            ))
                                        }
                                        <button onClick={(event) => filter("page", event, 0, 500)}>
                                            <span className="fa fa-angle-right"></span>
                                        </button>
                                    </ul>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
            </main>
        </body>
    </>
};
export default Search;