/* eslint-disable react/display-name */
import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { sampleUsers } from "../constants/sampleData";
import UserItm from "../shared/UserItm";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { setIsNewGroup } from "../../redux/reducers/mis";
import toast from "react-hot-toast";

const NewGroups = () => {
  const { isNewGroup } = useSelector((state) => state.mis);
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup, isNewGroupLoading] = useAsyncMutation(useNewGroupMutation);
  const groupName = useInputValidation("");
  const [selectedMembers, setselectedMembers] = useState([]);

  console.log(data);
  const errors = [
    {
      isError,
      error,
    },
  ];
  useErrors(errors);
  const selectHandelerMember = (id) => {
    setselectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currEle) => currEle !== id)
        : [...prev, id]
    );
  };
  // console.log(selectedMembers);
  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is requried.");

    if (selectedMembers.length < 2)
      toast.error("Please select atleast 3 members.");

    newGroup("Creating New Group...",{ name: groupName.value, members: selectedMembers });

    closeHandler();
  };
  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <Dialog onClose={closeHandler} open={isNewGroup}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>
        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1">Members</Typography>
        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((i) => (
              <UserItm
                user={i}
                key={i._id}
                handeler={selectHandelerMember}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          )}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button
            variant="outlined"
            color="error"
            size="large"
            onClick={closeHandler}
           
          >
            Cancel
          </Button>
          <Button variant="contained" size="large" onClick={submitHandler} disabled={isNewGroupLoading}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroups;
