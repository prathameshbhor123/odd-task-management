import React from 'react';
const Home = () => {
    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
            style={{ backgroundImage: "url(https://blogimage.vantagecircle.com/content/images/2019/10/employee-grievances.png)" }}>
            <div className="text-center px-4 sm:ml-[70px]">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-black drop-shadow-lg">
                    Welcome to the Grievance Redressal System
                </h1>
                <p className="text-xl sm:text-2xl text-black drop-shadow-lg">
                    Your one-stop solution for managing and tracking complaints efficiently.
                </p>
            </div>
        </div>
    );
};

export default Home;