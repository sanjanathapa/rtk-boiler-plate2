import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import { WithoutAuth } from "./WithoutAuth";
import { MISCurrentUser } from "utils/validations";

import {
  LoginPage,
  ForgotPasswordPage,
  ReportsPage,
  DashboardPage,
  ChangePasswordPage,
  NonCompliancePage,
  MembersPage,
  RolesPage,
  ProfilePage,
  MasterSettingsPage,
  TestPage,
  ErrorPage,
} from "pages";

import AddRole from "components/Roles/AddRole";
import EditRole from "components/Roles/EditRole";
import AddMember from "components/Members/Member/AddMember";
import EditMember from "components/Members/Member/EditMember";
import ViewMember from "components/Members/Member/ViewMember";
import routes from "router/routes";

import {
  canAddRole,
  canAddUser,
  canEditRole,
  canEditUser,
  canViewDashboard,
  canViewNC,
  canViewReport,
  canViewRole,
  canViewUser,
  canViewMasterSettings,
  canViewAccounting,
  canViewPreSales,
  canAddPreSales,
  canEditPreSales,
} from "utils/permissions";

import { get } from "lodash";
import T from "T";
import AccountingPage from "pages/AccountingPage";
import PreSalesPage from "pages/PreSalesPage";
import CreateNewProject from "components/PreSales/CreateNewProject";
import EditPreSalesProject from "components/PreSales/EditPreSalesProject";
import RecommendedMemberPage from "pages/RecommendedMemberPage";

const MainRoute = () => {
  // Initial page, we can change this based on user role in future
  const { sessionToken, user } = MISCurrentUser();
  const userRole=get(user,"role","");
  const defaultPath = routes.app.login;
  const redirectPath = sessionToken && userRole!==T.ACCOUNTANT ?
                         routes.app.members : sessionToken && userRole===T.ACCOUNTANT ? 
                         routes.app.accounting : defaultPath;
  return (
    <Routes>
      <Route
        path={routes.app.login}
        element={
          <WithoutAuth path={routes.app.login}>
            <LoginPage />
          </WithoutAuth>
        }
      />
      <Route
        path={routes.app.forgotPwd}
        element={
          <WithoutAuth path={routes.app.forgotPwd}>
            <ForgotPasswordPage />
          </WithoutAuth>
        }
      />
      <Route path="/" element={<Navigate to={redirectPath} />} />
      <Route
        path={routes.app.changePwd}
        element={
          <RequireAuth path={routes.app.changePwd}>
            <ChangePasswordPage />
          </RequireAuth>
        }
      />

      {canViewReport() && (
        <Route
          exact
          path={routes.app.reports}
          element={
            <RequireAuth path={routes.app.reports}>
              <ReportsPage />
            </RequireAuth>
          }
        />
      )}

      {canViewDashboard() && (
        <Route
          exact
          path={routes.app.dashboard}
          element={
            <RequireAuth path={routes.app.dashboard}>
              <DashboardPage />
            </RequireAuth>
          }
        />
      )}
      {canViewUser() && (
        <Route
          exact
          path={routes.app.members}
          element={
            <RequireAuth path={routes.app.members}>
              <MembersPage />
            </RequireAuth>
          }
        />
      )}

      {canAddUser() && (
        <Route
          exact
          path={routes.app.addMembers}
          element={
            <RequireAuth path={routes.app.addMembers}>
              <AddMember />
            </RequireAuth>
          }
        />
      )}
      {canEditUser() && (
        <Route
          exact
          path={routes.app.editMembers}
          element={
            <RequireAuth path={routes.app.editMembers}>
              <EditMember />
            </RequireAuth>
          }
        />
      )}
      {canViewUser() && (
        <Route
          exact
          path={routes.app.viewMembers}
          element={
            <RequireAuth path={routes.app.viewMembers}>
              <ViewMember />
            </RequireAuth>
          }
        />
      )}
      {canViewRole() && (
        <Route
          exact
          path={routes.app.roles}
          element={
            <RequireAuth path={routes.app.roles}>
              <RolesPage />
            </RequireAuth>
          }
        />
      )}

      {canAddRole() && (
        <Route
          exact
          path={routes.app.addRoles}
          element={
            <RequireAuth path={routes.app.addRoles}>
              <AddRole />
            </RequireAuth>
          }
        />
      )}

      {canEditRole() && (
        <Route
          exact
          path={routes.app.editRoles}
          element={
            <RequireAuth path={routes.app.editRoles}>
              <EditRole />
            </RequireAuth>
          }
        />
      )}

      {canViewNC() && (
        <Route
          exact
          path={routes.app.nonCompliance}
          element={
            <RequireAuth path={routes.app.nonCompliance}>
              <NonCompliancePage />
            </RequireAuth>
          }
        />
      )}

      {canViewMasterSettings() && (
        <Route
          exact
          path={routes.app.masterSettings}
          element={
            <RequireAuth path={routes.app.masterSettings}>
              <MasterSettingsPage />
            </RequireAuth>
          }
        />
      )}
      {canViewAccounting() && (
        <Route
          exact
          path={routes.app.accounting}
          element={
            <RequireAuth path={routes.app.accounting}>
              <AccountingPage />
            </RequireAuth>
          }
        />
      )}
      {canViewPreSales() && (
        <Route
          exact
          path={routes.app.preSales}
          element={
            <RequireAuth path={routes.app.preSales}>
              <PreSalesPage />
            </RequireAuth>
          }
        />
      )}

      {canViewPreSales() && (
        <Route
          exact
          path={routes.app.recommendedMembers}
          element={
            <RequireAuth path={routes.app.recommendedMembers}>
              <RecommendedMemberPage/>
            </RequireAuth>
          }
        />
      )}
      
      {canAddPreSales() && (
        <Route
          exact
          path={routes.app.createNewProject}
          element={
            <RequireAuth path={routes.app.createNewProject}>
              <CreateNewProject />
            </RequireAuth>
          }
        />
      )}
      {canEditPreSales() && (
        <Route
          exact
          path={routes.app.editPreSalesProject}
          element={
            <RequireAuth path={routes.app.editPreSalesProject}>
              <EditPreSalesProject />
            </RequireAuth>
          }
        />
      )}

      <Route
        exact
        path={routes.app.profile}
        element={
          <RequireAuth path={routes.app.profile}>
            <ProfilePage />
          </RequireAuth>
        }
      />

      <Route
        exact
        path={routes.app.test}
        element={
          <WithoutAuth path={routes.app.test}>
            <TestPage />
          </WithoutAuth>
        }
      />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default MainRoute;
