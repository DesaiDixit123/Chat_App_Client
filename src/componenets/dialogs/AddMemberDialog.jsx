import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { sampleUsers } from "../constants/sampleData";
import UserItm from "../shared/UserItm";
import { useState } from "react";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAddGroupMembersMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/mis";

const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.mis);
  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);
  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation
  );
  const [selectedMembers, setselectedMembers] = useState([]);

  const selectHandelerMember = (id) => {
    setselectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currEle) => currEle !== id)
        : [...prev, id]
    );
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };
  const addMemberSubmitHandler = () => {
    addMembers("Adding Members...", { members: selectedMembers, chatId });
    closeHandler();
  };
  // console.log("Available friends :",)
  useErrors([{ isError, error }]);
  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {isLoading ? (
            <Skeleton />
          ) : data?.availableFriends?.length > 0 ? (
            data?.availableFriends?.map((i) => (
              <UserItm
                key={i._id}
                user={i}
                handeler={selectHandelerMember}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isLoadingAddMembers}
            onClick={addMemberSubmitHandler}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
