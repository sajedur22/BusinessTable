import React from 'react';
import Lottie from 'lottie-react';
import Animat from "../../assets/images/Loading Files.json";

const LoaderSkeleton = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="col-12 col-md-6 text-center">
                <Lottie animationData={Animat} loop={true} style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }} />

            </div>
        </div>
    );
};

export default LoaderSkeleton;
