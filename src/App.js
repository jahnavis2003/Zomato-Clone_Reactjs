import Home from "./components/Home";
import Search from "./components/Search";
import PageNotFound from "./components/PageNotFound";
import Restaurant from "./components/Restaurant";
import {Route, Routes} from "react-router-dom";
const App = () => {
  return (
    <>
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/search/:meal_id/:meal_type_name" element={<Search />}/>
          <Route path="/restaurant/:id" element={<Restaurant />}/>
          <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </div>

    </>

  );
};

// export area --> export function
// module.exports = App; es5
export default App; //es6
