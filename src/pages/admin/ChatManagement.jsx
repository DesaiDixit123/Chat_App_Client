import { useFetchData } from "6pp";
import { Skeleton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import AdminLayout from "../../componenets/Layouts/AdminLayout";
import AvatarCard from "../../componenets/shared/AvatarCard";
import Table from "../../componenets/shared/Table";
import { useErrors } from "../../hooks/hook";
import { transformImage } from "../../lib/features";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => {
      console.log(params.row.avatar);
      return <AvatarCard alt={params.row.name} avatar={params.row.avatar} />;
    },
  },

  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "groupChat",
    headerName: "Group",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.members} />
    ),
  },
  {
    field: "totalMessages ",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "creator ",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AvatarCard src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];
const ChatManagement = () => {
  const { loading, data, error } = useFetchData(
    "/api/chatsadmin",
    "dashboard-chats"
  );

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  // console.log("ChatData:",data.allChats);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (data) {
      setRows(
        data.allChats.map((i) => ({
          ...i,
          id: i._id,
          avatar: i.avatar.map((i) => transformImage(i, 50)),
          members: i.members.map((i) => transformImage(i.aavatar, 50)),
          creator: {
            name: i.creator.name,
            avatar: transformImage(i.creator.avatar, 50),
          },
        }))
      );
  }
  }, [data]);
  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"}/>
      ) : (
        <Table heading={"All chats"} columns={columns} rows={rows} />
      )}
    </AdminLayout>
  );
};

export default ChatManagement;
