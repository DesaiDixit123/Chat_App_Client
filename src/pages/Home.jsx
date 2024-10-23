import { Box, Typography } from "@mui/material";
import AppLayout from "../componenets/Layouts/AppLayout";
import { grayColor } from "../componenets/constants/color";

// eslint-disable-next-line react-refresh/only-export-components
const Home = () => {
  return (
    <Box bgcolor={grayColor } height={"100%"}>
      
      <Typography p={"2rem"} variant="h5" textAlign={"center"}>
        
        Select a friend to chat
      </Typography>
    </Box>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default AppLayout()(Home);
