import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const OnlyAdminPrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser && currentUser.isAdmin ? (
    <>{element}</>
  ) : (
    <Navigate to="/login" />
  );
};

export default OnlyAdminPrivateRoute;
