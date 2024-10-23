import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import ProtectRoute from "./componenets/auth/ProtectRoute";
import LayoutLoaders from "./componenets/Layouts/Loaders";
import UserManagement from "./pages/admin/UserManagement";
import ChatManagement from "./pages/admin/ChatManagement";
import MessageManagement from "./pages/admin/MessageManagement";
// import {  } from "@mui/icons-material";
import axios from "axios";
import { server } from "./componenets/constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExits, userNotExits } from "./redux/reducers/auth";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./socket";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const GroupManage = lazy(() => import("./pages/GroupManage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`/api/profile`, { withCredentials: true })
      .then(({ data }) => dispatch(userExits(data.user)))
      .catch((err) => dispatch(userNotExits()));
  }, [dispatch]);
  return loader ? (
    <LayoutLoaders />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoaders />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectRoute user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />}></Route>
            <Route path="/chat/:chatId" element={<Chat />}></Route>
            <Route path="/groups" element={<GroupManage />}></Route>
          </Route>
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route path="/admin/chats-management" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;
