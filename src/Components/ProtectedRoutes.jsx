import NotFound from "../Pages/NotFound";

export const ProtectedRoutes = ({ children, adminOnly = false, staffOnly = false, residentOnly = false }) => {
   const token = localStorage.getItem("token");
   const role = localStorage.getItem("role");   
   if (!token) {
      return <NotFound to="/login" />;
   }
   if (adminOnly && role !== "admin") {
      return <NotFound />;
   }
   if (staffOnly && role !== "staff") {
      return <NotFound />;
   }
   if (residentOnly && role !== "resident" ) {
      return <NotFound />;
   }
   return children
};