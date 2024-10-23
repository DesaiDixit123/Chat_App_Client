/* eslint-disable react/prop-types */
import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { orange } from "../constants/color";
import {
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExits } from "../../redux/reducers/auth";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/mis";
import { resetNotificationCount } from "../../redux/reducers/chat";
const Search = lazy(() => import("../specific/Search"));
const Notification = lazy(() => import("../specific/Notification"));
const NewGroups = lazy(() => import("../specific/NewGroups"));

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isSearch, isNotification,isNewGroup, } = useSelector((state) => state.mis);
  const { notificationsCount } = useSelector((state) => state.chat);

  // const [isNotification, setIsNotification] = useState(false);
  const handeleMobile = () => {
    dispatch(setIsMobile(true));

    console.log("Mobile");
  };

  const openSearch = () => {
    dispatch(setIsSearch(true));
  };

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true))
  };

  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount())
  };

  const NavigareToGroup = () => {
    navigate("/groups");
  };

  const LogoutHandeler = async () => {
    try {
      const { data } = await axios.post("/api/logout", {
        withCredentials: true,
      });

      dispatch(userNotExits());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: orange }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              Chat App
            </Typography>
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handeleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
              }}
            />

            <Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearch}
              />
              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />
              <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon />}
                onClick={NavigareToGroup}
              />
              <IconBtn
                title={"Notifications"}
                icon={<NotificationIcon />}
                onClick={openNotification}
                value={notificationsCount}
              />
              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={LogoutHandeler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <Search />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <Notification />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroups />
        </Suspense>
      )}
    </>
  );
};

export default Header;

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? <Badge badgeContent={value} color="error"> {icon}</Badge> : icon}
      </IconButton>
    </Tooltip>
  );
};
