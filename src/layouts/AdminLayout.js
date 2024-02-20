import AdminNavBar from '../components/AdminComponents/AdminNavBar';
import { Outlet } from "react-router-dom";
import useApiPrivate from "../hooks/useAPIPrivate";
import { useDispatch } from "react-redux";
import { removeAuthValues } from "../features/auth";
import { removeStudentProfile } from "../features/studentProfile";
import AdminSidebar from '../components/AdminComponents/AdminSidebar';

const AdminLayout = () => {

    const apiPrivate = useApiPrivate();
    const dispatch = useDispatch();

    const handleLogOut = async () => {
        try {
          const response = await apiPrivate.get("/auth/logout", {
            withCredentials: true,
          });
          if (response.status === 200) {
            dispatch(removeAuthValues());
            dispatch(removeStudentProfile());
          }
          console.log(response);
        } catch (error) {
          console.log(error);
        }
    };

  return (
    <div className="bg-white">
      <div className="flex-col space-y-16">
        <AdminNavBar handleLogOut={handleLogOut}/>
        <AdminSidebar/>
      </div>

      <div className="ml-60 mr-20 mb-10 mt-20">
        <Outlet/>
      </div>

    </div>
  )
}

export default AdminLayout