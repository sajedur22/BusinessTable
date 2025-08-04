import React, {Fragment} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import FullscreenLoader from "./component/masterLayout/Fullscreen-Loader.jsx";
import ProductList from "./component/pages/product-list.jsx";

const App = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<ProductList/>} />
                </Routes>
            </BrowserRouter>
            <FullscreenLoader/>
        </Fragment>
    );
};
export default App;