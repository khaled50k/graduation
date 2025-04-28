import React from 'react';

const WelcomeSection = () => {
    return (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 shadow-lg">
            <div className="relative">
                <h1 className="text-3xl font-bold text-white">Welcome back! 👋</h1>
                <p className="mt-2 text-blue-100">Your job platform is growing!</p>
            </div>
            <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
        </div>
    );
};

export default WelcomeSection; 