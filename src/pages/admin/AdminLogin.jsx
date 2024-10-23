import {
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from "@mui/material";
// import { VisuallyHiddenInput } from "../componenets/styles/StylesComponent";
import { useInputValidation } from "6pp";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, verifyAdmin } from "../../redux/thunks/admin";
import { useEffect } from "react";
// import { usernameValidator } from "../utils/validator";


const AdminLogin = () => {
const {isAdmin}=useSelector((state)=>state.auth)

  const dispatch=useDispatch()
  const secretKey=useInputValidation("")

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(adminLogin(secretKey.value))
  
  }

  useEffect(() => {
    dispatch(verifyAdmin())
  },[dispatch])

  if(isAdmin) return <Navigate to={"/admin/dashboard"}/>

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgb(244, 148, 97), rgba(170, 202, 114, 0.67))",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          paddingTop: "8rem",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {
               <>
               <Typography variant="h5 ">Admin Login</Typography>
               <form
                 style={{ width: "100%", marginTop: "1rem" }}
                 onSubmit={submitHandler}
               >
                
                 <TextField
                   required
                   fullWidth
                   label="Secret Key"
                   type="password"
                   margin="normal"
                   variant="outlined"
                   value={secretKey.value}
                   onChange={secretKey.changeHandler}
                 />
                 <Button
                   variant="contained"
                   color="primary"
                   type="submit"
                   fullWidth
                   sx={{ marginTop: "1rem" }}
                 >
                   Login
                 </Button>
                 
               </form>
             </>
       }
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
