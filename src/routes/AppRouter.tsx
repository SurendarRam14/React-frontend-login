import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingScreen from '../components/Loading/LoadingScreen';

// Lazy load components
const Login = lazy(() => import('../pages/Login/LoginPage'));
const Home = lazy(() => import('../pages/Home/Home'));

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Suspense fallback={<LoadingScreen />}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default AppRouter;