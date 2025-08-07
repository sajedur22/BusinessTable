import React, { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { GetProductList } from "../../routes/api.jsx";
import { useSelector } from "react-redux";
import LoaderSkeleton from "../masterLayout/loader.jsx";

const ProductList = () => {
    const [searchKey, setSearchKey] = useState("0");
    const [perPageKey, setPerPageKey] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const ALLProduct = useSelector((state) => state.product.ALLProduct);
    const Total = useSelector((state) => state.product.Total);

    // Track window resize for mobile view
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fetch on first load and when params change
    useEffect(() => {
        GetProductList(currentPage, perPageKey, searchKey);
    }, [currentPage, perPageKey, searchKey]);

    const pageCount = Math.ceil(Total / perPageKey) || 0;

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    };

    const handleSearch = () => {
        setCurrentPage(1);
        setSearchKey((prev) => (prev.trim() === "" ? "0" : prev));
    };
if(!ALLProduct || ALLProduct.length===0){
    return <LoaderSkeleton/>
}else {
    return (
        <Fragment>
            <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid">
                                    {/* Header */}
                                    <div className="row mb-3">
                                        <div className="col-md-6 col-12 mb-2">
                                            <h5>My Product List</h5>
                                        </div>
                                        <div className="col-md-2 col-6 mb-2">
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
                                        {/*search*/}
                                        <div className="col-md-4 col-12 mb-2">
                                            <div className="d-flex flex-column flex-md-row">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm mb-2 mb-md-0 me-md-2"
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

                                    {/* Product List */}
                                    <div className="row">
                                        <div className="col-12">
                                            {ALLProduct && ALLProduct.length > 0 ? (
                                                isMobile ? (
                                                    // Mobile view: card layout
                                                    ALLProduct.map((item, i) => (
                                                        <div className="card shadow-sm mb-3" key={item._id || i}>
                                                            <div className="card-body d-flex align-items-start">
                                                                {/* Image */}
                                                                <img
                                                                    src={item.image || "/default.png"}
                                                                    alt={item.title}
                                                                    onError={(e) => (e.target.src = "/default.png")}
                                                                    style={{
                                                                        width: "60px",
                                                                        height: "60px",
                                                                        objectFit: "cover",
                                                                        borderRadius: "8px",
                                                                        flexShrink: 0,
                                                                    }}
                                                                    className="me-3"
                                                                />

                                                                {/* Text Content */}
                                                                <div style={{
                                                                    overflowWrap: "break-word",
                                                                    wordBreak: "break-word",
                                                                    flex: "1 1 0"
                                                                }}>
                                                                    <h6 className="mb-1 fw-semibold text-truncate">{item.title}</h6>
                                                                    <p className="mb-1 text-muted small">{item.category}</p>

                                                                    <div className="small text-secondary">
                                                                        <div><strong>Brand:</strong> {item.brand}</div>
                                                                        <div><strong>Price:</strong> {item.price} Taka
                                                                        </div>
                                                                        <div><strong>Stock:</strong> {item.stock}</div>
                                                                        <div><strong>Code:</strong> {item.product_code}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    ))
                                                ) : (
                                                    // Desktop view: table layout
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
                                                            {ALLProduct.map((item, i) => (
                                                                <tr key={item._id || i}>
                                                                    <td>
                                                                        <div className="d-flex px-2 py-1">
                                                                            <div>
                                                                                <img
                                                                                    src={item.image}
                                                                                    alt={item.title}
                                                                                    className="avatar me-3"
                                                                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                                                    onError={(e) => (e.target.src = "/default.png")}
                                                                                />
                                                                            </div>
                                                                            <div className="d-flex flex-column justify-content-center">
                                                                                <h6 className="mb-0 text-xs">{item.title}</h6>
                                                                                <p className="text-xs text-secondary mb-0">{item.category}</p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <p className="text-xs font-weight-bold mb-0">{item.brand}</p>
                                                                        <p className="text-xs text-secondary mb-0">{item.price} Taka</p>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <span className="badge bg-gradient-success">{item.stock}</span>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <span className="text-secondary text-xs font-weight-bold">{item.product_code}</span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )
                                            ) : (
                                                <div className="text-center">No products found</div>
                                            )}
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
}

};

export default ProductList;
