import NotFound from "../Pages/NotFound";

export const ProtectedRoutes = ({ children, adminOnly = false, staffOnly = false }) => {
   const token = localStorage.getItem("token");
   const userRole = localStorage.getItem("userRole");   
   if (!token) {
      return <NotFound to="/login" />;
   }
   if (adminOnly && userRole !== "admin") {
      return <NotFound />;
   }
   if (staffOnly && userRole !== "staff") {
      return <NotFound />;
   }
   return children
};