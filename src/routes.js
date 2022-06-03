import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { SolvePage } from './pages/SolvePage';
import { TopThreePage } from './pages/TopThreePage';

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path='*' element={<Navigate to='/solve' />} />
                <Route path='/' element={<Navigate to='/solve' />} />
                <Route path='/solve' element={<SolvePage />} />
                <Route path='/topthree' element={<TopThreePage />} />
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path='/' element={<AuthPage />} />
            <Route path='*' element={<AuthPage />} />
        </Routes>
    )
}