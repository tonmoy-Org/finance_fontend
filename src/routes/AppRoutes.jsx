import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/login/Login';
import { useAuth } from '../auth/AuthProvider';
import { PrivateRoute } from '../auth/PrivateRoute';

import { SuperAdminLayout } from '../pages/superadmin/components/SuperAdminLayout';
import { MemberLayout } from '../pages/member/components/MemberLayout';

import { TechLayout } from '../pages/tech/components/TechLayout';

import { SuperAdminDashboard } from '../pages/superadmin/SuperAdminDashboard';
import { SuperAdminProfile } from '../pages/superadmin/Profile';
import { UserManagement } from '../pages/superadmin/UserManagement';


import { MemberDashboard } from '../pages/member/MemberDashboard';
import { MemberProfile } from '../pages/member/Profile';

import { TechDashboard } from '../pages/tech/TechDashboard';
import { TechProfile } from '../pages/tech/Profile';

import { ErrorPage } from '../pages/error/ErrorPage';
import RMEReports from '../pages/member/HMIS/RMEReports';
import RSSReports from '../pages/member/HMIS/RSSReports';
import TOSReports from '../pages/member/HMIS/TOSReports';



export const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Error Routes */}
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/unauthorized" element={<ErrorPage type="unauthorized" />} />
        <Route path="/not-found" element={<ErrorPage type="not-found" />} />
        <Route path="/server-error" element={<ErrorPage type="server-error" />} />

        {/* Dashboard Redirect */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {user?.role === 'superadmin' && <Navigate to="/superadmin-dashboard" replace />}
              {user?.role === 'manager' && <Navigate to="/member-dashboard" replace />}
              {user?.role === 'tech' && <Navigate to="/tech-dashboard" replace />}
            </PrivateRoute>
          }
        />

        {/* Super Admin Routes */}
        <Route
          path="/superadmin-dashboard"
          element={
            <PrivateRoute requiredRoles={['superadmin']}>
              <SuperAdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<SuperAdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="profile" element={<SuperAdminProfile />} />
        </Route>

        {/* Member Routes */}
        <Route
          path="/member-dashboard"
          element={
            <PrivateRoute requiredRoles={['member']}>
              <MemberLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<MemberDashboard />} />
          <Route path="profile" element={<MemberProfile />} />

          {/* Health Department Reports */}
          <Route path="health-department-reports/rme" element={<RMEReports />} />
          <Route path="health-department-reports/rss" element={<RSSReports />} />
          <Route path="health-department-reports/tos" element={<TOSReports />} />
        </Route>

        {/* Tech Routes */}
        <Route
          path="/tech-dashboard"
          element={
            <PrivateRoute requiredRoles={['tech']}>
              <TechLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<TechDashboard />} />
          <Route path="profile" element={<TechProfile />} />
        </Route>

        {/* Fallback Routes */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Catch-all 404 Route */}
        <Route path="*" element={<ErrorPage type="not-found" />} />
      </Routes>
    </Router>
  );
};