import React, { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { GetProductList } from "../../routes/api.jsx";
import { useSelector } from "react-redux";

const ProductList = () => {
    const [searchKey, setSearchKey] = useState("0");
    const [perPageKey, setPerPageKey] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const ALLProduct = useSelector((state) => state.product.ALLProduct);
    const Total = useSelector((state) => state.product.Total);

    // Fetch on first load and whenever dependencies change
    useEffect(() => {
        GetProductList(currentPage, perPageKey, searchKey);
    }, [currentPage, perPageKey, searchKey]);

    // Total pages for pagination
    const pageCount = Math.ceil(Total / perPageKey) || 0;

    // Pagination Handler
    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1); // ReactPaginate starts at 0
    };

    // Handle Search
    const handleSearch = () => {
        setCurrentPage(1); // reset to first page
        if (searchKey.trim() === "") {
            setSearchKey("0");
        } else {
            setSearchKey(searchKey);
        }
    };

    return (
        <Fragment>
            <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid">
                                    {/* Header Row */}
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <h5>My Product List</h5>
                                        </div>
                                        <div className="col-2">
                                            <select
                                                className="form-control form-select-sm"
                                                value={perPageKey}
                                                onChange={(e) => {
                                                    setPerPageKey(Number(e.target.value));
                                                    setCurrentPage(1);
                                                }}
                                            >
                                                {[5, 10, 20, 30, 50, 100, 200].map((num) => (
                                                    <option key={num} value={num}>
                                                        {num} Per Page
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <div className="input-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    placeholder="Search.."
                                                    value={searchKey === "0" ? "" : searchKey}
                                                    onChange={(e) => setSearchKey(e.target.value)}
                                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                                />
                                                <button
                                                    className="btn btn-outline-primary btn-sm"
                                                    type="button"
                                                    onClick={handleSearch}
                                                >
                                                    Search
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Table */}
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive data-table">
                                                <table className="table">
                                                    <thead className="sticky-top bg-white">
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>Price</th>
                                                        <th className="text-center">Stock</th>
                                                        <th className="text-center">Code</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {ALLProduct.length > 0 ? (
                                                        ALLProduct.map((item, i) => (
                                                            <tr key={item._id || i}>
                                                                <td>
                                                                    <div className="d-flex px-2 py-1">
                                                                        <div>
                                                                            <img
                                                                                src={item.image}
                                                                                alt={item.title}
                                                                                className="avatar me-3"
                                                                            />
                                                                        </div>
                                                                        <div className="d-flex flex-column justify-content-center">
                                                                            <h6 className="mb-0 text-xs">
                                                                                {item.title}
                                                                            </h6>
                                                                            <p className="text-xs text-secondary mb-0">
                                                                                {item.category}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <p className="text-xs font-weight-bold mb-0">
                                                                        {item.brand}
                                                                    </p>
                                                                    <p className="text-xs text-secondary mb-0">
                                                                        {item.price} Taka
                                                                    </p>
                                                                </td>
                                                                <td className="text-center">
                                                                   <span className="badge bg-gradient-success">
                                                                        {item.stock}

                                                                      </span>
                                                                </td>
                                                                <td className="text-center">
                                                            <span className="text-secondary text-xs font-weight-bold">
                                                               {item.product_code}
                                                             </span>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="4" className="text-center">
                                                                No products found
                                                            </td>
                                                        </tr>
                                                    )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* Pagination */}
                                        <div className="col-12 mt-4">
                                            <ReactPaginate
                                                previousLabel="<"
                                                nextLabel=">"
                                                breakLabel="..."
                                                pageCount={pageCount}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={5}
                                                onPageChange={handlePageClick}
                                                containerClassName="pagination justify-content-center"
                                                pageClassName="page-item"
                                                pageLinkClassName="page-link"
                                                previousClassName="page-item"
                                                previousLinkClassName="page-link"
                                                nextClassName="page-item"
                                                nextLinkClassName="page-link"
                                                breakClassName="page-item"
                                                breakLinkClassName="page-link"
                                                activeClassName="active"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductList;
