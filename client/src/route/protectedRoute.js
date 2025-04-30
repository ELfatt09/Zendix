import { useEffect, useState } from "react";
import { useAuth } from "../authContext";
import { Navigate } from "react-router-dom";
import Loading from "../layout/loading";

const ProtectedRoute = ({ children }) => {
  const { auth, loading } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Ketika loading selesai, kita berhenti checking
    if (!loading) {
      setChecking(false);
    }
  }, [loading]);

  // Tampilkan loading atau komponen lain saat sedang memeriksa
  if (checking) {
    return <Loading/>
  } else {
    // Setelah selesai checking, kita memeriksa auth
    if (!auth) {
      // return console.log("not logged in");
      return <Navigate to="/auth/login" />;
    } else {
      // return console.log("logged in");
      return children
    }
  };
}
export default ProtectedRoute;