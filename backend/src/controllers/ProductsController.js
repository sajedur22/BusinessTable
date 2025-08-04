const ProductsModel=require('../models/ProductModel');

exports.ProductList = async (req, res) => {
    try {
        const pageNo = parseInt(req.params.pageNo) || 1;
        const perPage = parseInt(req.params.perPage) || 10;
        const skipRow = (pageNo - 1) * perPage;



        const rawSearch = req.params.searchKey;
        const searchValue = (rawSearch && rawSearch !== "0") ? rawSearch.trim() : "";

        let matchQuery = {};
        if (searchValue) {
            const SearchRgx = { $regex: searchValue, $options: "i" };
            matchQuery = {
                $or: [
                    { title: SearchRgx },
                    { category: SearchRgx },
                    { subcategory: SearchRgx },
                    { brand: SearchRgx },
                    { remark: SearchRgx },
                ],
            };
        }
        console.log("Raw searchKey:", req.params.searchKey);

        console.log({ pageNo, perPage, skipRow,matchQuery }); // debug
        const data = await ProductsModel.aggregate([
            { $match: matchQuery },
            {
                $facet: {
                    Total: [{ $count: "count" }],
                    Rows: [{ $skip: skipRow }, { $limit: perPage }],
                },
            },
        ]);

        res.status(200).json({
            status: "success",
            total: data[0]?.Total[0]?.count || 0,
            rows: data[0]?.Rows || [],
        });
    } catch (e) {
        res.status(500).json({ status: "fail", error: e.message });
    }
};

