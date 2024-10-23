import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const adminLogin = createAsyncThunk("admin/login", async (secretKey) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/verifyadmin", { secretKey }, config);

    return data.message;
  } catch (error) {


    console.log(error.response.data.message)
    throw error.response.data.message;
  }
});
export const verifyAdmin = createAsyncThunk("admin/getAdmin", async () => {
  try {
    

    const { data } = await axios.get("/api/admin",{withCredentials:true});

    return data.admin;
  } catch (error) {


    console.log(error.response.data.message)
    throw error.response.data.message;
  }
});
export const adminLogout = createAsyncThunk("admin/logout", async () => {
  try {
    

    const { data } = await axios.post("/api/logoutadmin",{withCredentials:true});

    return data.message     ;
  } catch (error) {


    console.log(error.response.data.message)
    throw error.response.data.message;
  }
});
