import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import { SetALLProduct, SetTotal } from "../redux/state-slice/product-slice";
import axios from "axios";
import { ErrorToast } from "../helpers/ValidationHelper";


const BaseURL = import.meta.env.VITE_API_BASE_URL+"/api/v1"; // ✅ from .env

export async function GetProductList(pageNo, perPage, searchKey = "0") {
    try {
        store.dispatch(ShowLoader());

        const URL = `${BaseURL}/ProductList/${pageNo}/${perPage}/${searchKey}`;


        const result = await axios.get(URL);
        console.log("✅ Axios Result:", result.data);
        store.dispatch(HideLoader());

        if (result.status === 200 && result.data.status === "success") {
            const rows = result.data.rows || [];
            const total = result.data.total || 0;

            if (rows.length > 0) {
                store.dispatch(SetALLProduct(rows));
                store.dispatch(SetTotal(total));
            } else {
                store.dispatch(SetALLProduct([]));
                store.dispatch(SetTotal(0));
                ErrorToast("Data not found");
            }
        } else {
            ErrorToast("Something went wrong");
        }
    } catch (e) {
        store.dispatch(HideLoader());
        ErrorToast("Something went wrong in catch");
        console.error("❌ Axios Error:", e.message);
    }
}
