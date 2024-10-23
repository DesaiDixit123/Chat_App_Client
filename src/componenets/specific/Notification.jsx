/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { setIsNotification } from "../../redux/reducers/mis";

const Notification = () => {
  const { isNotification } = useSelector((state) => state.mis);
  const dispatch = useDispatch();

  const { isLoading, data, error, isError } = useGetNotificationsQuery();
  const [acceptRequest] =useAsyncMutation( useAcceptFriendRequestMutation);
  const friendrequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
  await  acceptRequest("Accepting Request...",{ requestId: _id, accept })

  };

  useErrors([{ error, isError }]);
  const isNotificationClose = () => {
    dispatch(setIsNotification(false));
  };
  return (
    <Dialog open={isNotification} onClose={isNotificationClose}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequest.length > 0 ? (
              data?.allRequest?.map(({ sender, _id }) => (
                <NotificationItem
                  key={_id}
                  sender={sender}
                  _id={_id}
                  handeler={friendrequestHandler}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>0 Notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handeler }) => {
  const { name, avatar } = sender;

  console.log("sender:", sender);
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${name} sent you a friend request`}
        </Typography>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handeler({ _id, accept: true })}>
            Accept
          </Button>
          <Button
            color="error"
            onClick={() => handeler({ _id, accept: false })}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});
export default Notification;
