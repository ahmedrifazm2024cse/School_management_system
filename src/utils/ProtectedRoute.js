import React from "react";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  // All protections disabled - pages load without any checks
  return children;
};

export default ProtectedRoute;
