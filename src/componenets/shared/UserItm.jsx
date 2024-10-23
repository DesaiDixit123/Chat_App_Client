/* eslint-disable react/prop-types */


import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import { memo } from "react";

const UserItm = ({
  user,
  handeler,
  handelerIsLoading,
  isAdded = false,
  styling = {},
}) => {
  // Accessing name, _id, avatar from the correct nested structure
  const { name, _id, avatar } = user;

  console.log(user)
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        {...styling}
      >
        <Avatar 
          src={avatar.url || avatar } // Access the URL from avatar object
          alt={name}              // Alt text for the image
        />
        
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-flex",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {name} {/* Display user's name */}
        </Typography>

        <IconButton
          onClick={() => handeler(_id)}  // Trigger handler with _id
          disabled={handelerIsLoading}    // Disable button while loading
          size="small"
          sx={{
            bgcolor: isAdded ? "error.main" : "primary.main", // Background color toggle
            color: "white",
            "&:hover": {
              bgcolor: isAdded ? "error.main" : "primary.dark",
            },
          }}
        >
          {isAdded ? <RemoveIcon /> : <AddIcon />}  {/* Toggle Add/Remove icon */}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItm);
