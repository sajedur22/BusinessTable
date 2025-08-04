import Swal from "sweetalert2";

// Error Toast
export const ErrorToast = (msg) => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: msg || "Something went wrong!",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
    });
};

// Success Toast
export const SuccessToast = (msg) => {
    Swal.fire({
        icon: "success",
        title: msg || "Operation successful!",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
    });
};

// Warning Toast
export const WarningToast = (msg) => {
    Swal.fire({
        icon: "warning",
        title: msg || "Be careful!",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
    });
};
