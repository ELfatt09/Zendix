import { useEffect, useState } from "react";
import { useAuth } from "../authContext";
import { Navigate } from "react-router-dom";
import Loading from "../layout/loading";

const VerifiedRoute = ({ children }) => {
  const { verified, loading } = useAuth();
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
    if (!verified) {
      // return console.log(verified);
      return <Navigate to="/auth/verify/" />;
    } else {
      // return console.log(verified);
      return children
    }
  };
}
export default VerifiedRoute;