import { useParams } from "react-router-dom";
import Header from "./Header";
const Search = () => {
    let {meal_id, meal_type_name} = useParams();
    // console.log(params);
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
                                    <select name="" id="" className="form-select rounded-0">
                                        <option value="">Select Location</option>
                                        <option value="">Hyderabad</option>
                                        <option value="">Mumbai</option>
                                        <option value="">Bangalore</option>
                                        <option value="">Pune</option>
                                        <option value="">Goa</option>
                                        <option value="">Kerala</option>
                                    </select>
                                </div>
                                <div className="my-2">
                                    <label className="form-label fw-bold text-primary">Cuisine</label>
                                    <div className="form-check ms-2">
                                        <input type="checkbox" className="form-check-input" />
                                        <label htmlFor="" className="form-check-label">North Indian</label>
                                    </div>
                                    <div className="form-check ms-2">
                                        <input type="checkbox" className="form-check-input" />
                                        <label htmlFor="" className="form-check-label">South Indian</label>
                                    </div>
                                    <div className="form-check ms-2">
                                        <input type="checkbox" className="form-check-input" />
                                        <label htmlFor="" className="form-check-label">Chineese</label>
                                    </div>
                                    <div className="form-check ms-2">
                                        <input type="checkbox" className="form-check-input" />
                                        <label htmlFor="" className="form-check-label">Fast Food</label>
                                    </div>
                                    <div className="form-check ms-2">
                                        <input type="checkbox" className="form-check-input" />
                                        <label htmlFor="" className="form-check-label">Street Food</label>
                                    </div>
                                </div>

                                <div className="my-2">
                                    <label className="form-label fw-bold text-primary">Cost for Two</label>
                                    <div className="form-check ms-2">
                                        <input type="radio" className="form-check-input" />
                                        <label htmlFor="" className="form-check-label">Less than ` 500</label>
                                    </div>
                                    <div className="form-check ms-2">
                                        <input type="radio" className="form-check-input" />
                                        <label htmlFor="" className="form-check-label">` 500 to ` 1000</label>
                                    </div>
                                    <div className="form-check ms-2">
                                        <input type="radio" className="form-check-input" />
                                        <label htmlFor="" className="form-check-label">` 1000 to ` 1500</label>
                                    </div>
                                    <div className="form-check ms-2">
                                        <input type="radio" className="form-check-input" />
                                        <label htmlFor="" className="form-check-label">` 1500 to ` 2000</label>
                                    </div>
                                    <div className="form-check ms-2">
                                        <input type="radio" className="form-check-input" />
                                        <label htmlFor="" className="form-check-label">` 2000+</label>
                                    </div>
                                </div>

                                <div className="my-2">
                                    <label className="form-label fw-bold text-primary">Sort</label>
                                    <div className="form-check ms-2">
                                        <input type="radio" className="form-check-input" />
                                        <label htmlFor="" className="form-check-label">Price low to high</label>
                                    </div>
                                    <div className="form-check ms-2">
                                        <input type="radio" className="form-check-input" />
                                        <label htmlFor="" className="form-check-label">Price high to low</label>
                                    </div>
                                </div>

                            </section>
                            <section className="col-lg-8 col-md-7 col-12 px-0 px-lg-2 px-md-2">
                                <section className="shadow bg-white p-3 px-4 mb-3">
                                    <section className="d-flex gap-3 align-items-center" >
                                        <img src="/images/bakery.jpg" alt="" className="restaurant-image"/>
                                        <section>
                                            <p className="fs-3 fw-bold text-dark-blue">The Big Chill Cakery</p>
                                            <p className="fw-bold text-dark-blue">FORT</p>
                                            <p className="text-muted">Shop 1, Plot D, Samruddhi Complex, Chincholi ...</p>
                                        </section>
                                    </section>
                                    <hr />
                                    <section className="d-flex gap-5">
                                        <section className="text-muted">
                                            <p>CUISINES:</p>
                                            <p>COST FOR TWO:</p>
                                        </section>
                                        <section className="text-dark-blue">
                                            <p>Bakery</p>
                                            <p>₹700</p>
                                        </section>
                                    </section>
                                </section>
                                <section className="shadow bg-white p-3 px-4 mb-3">
                                    <section className="d-flex gap-3 align-items-center" >
                                        <img src="/images/cake.jpg" alt="" className="restaurant-image"/>
                                        <section>
                                            <p className="fs-3 fw-bold text-dark-blue">The Bake Shop</p>
                                            <p className="fw-bold text-dark-blue">FORT</p>
                                            <p className="text-muted">Shop 1, Plot D, Samruddhi Complex, Chincholi ...</p>
                                        </section>
                                    </section>
                                    <hr />
                                    <section className="d-flex gap-5">
                                        <section className="text-muted">
                                            <p>CUISINES:</p>
                                            <p>COST FOR TWO:</p>
                                        </section>
                                        <section className="text-dark-blue">
                                            <p>Bakery</p>
                                            <p>₹700</p>
                                        </section>
                                    </section>
                                </section>
                                <section>
                                    <ul className="list-unstyled d-flex justify-content-center gap-4 zomato-paging"> 
                                        <li >
                                            <span className="fa fa-angle-left"></span>
                                        </li>
                                        <li className="zomato-paging-active">1</li>
                                        <li >2</li>
                                        <li >3</li>
                                        <li >4</li>
                                        <li >5</li>
                                        <li >
                                            <span className="fa fa-angle-right"></span>
                                        </li>
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