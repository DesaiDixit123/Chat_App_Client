import { useFetchData } from "6pp";
import { Avatar, Box, Skeleton, Stack } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import AdminLayout from "../../componenets/Layouts/AdminLayout";
import RenderAttachment from "../../componenets/shared/RenderAttachment";
import Table from "../../componenets/shared/Table";
import { useErrors } from "../../hooks/hook";
import { fileFormat, transformImage } from "../../lib/features";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row;

      return attachments?.length > 0
        ? attachments.map((i) => {
            const url = i.url;
            const file = fileFormat(url);
            return (
              <Box key={url}>
                <a
                  href={url}
                  download={true}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "black" }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })
        : "No Attachments";
    },
  },

  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },

  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
];
const MessageManagement = () => {
  const { loading, data, error } = useFetchData(
    "/api/messagesadmin",
    "dashboard-messages"
  );

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  // console.log("messagesdata:", data.messages);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      setRows(
        data.messages.map((i) => ({
          ...i,
          id: i._id,
          sender: i.sender
            ? {
                name: i.sender.name || "Unknown Sender", // Default value if name is missing
                avatar: transformImage(i.sender.avatar, 50),
              }
            : {
                name: "Unknown Sender", // Fallback if sender is null
                avatar: "", // Provide a default or empty avatar
              },
          createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss:a"),
        }))
      );
    }
  }, [data]);
  return (
    <AdminLayout>
      {loading ? (
      <Skeleton height={"100vh"}/>
      ) : (
        <Table
          heading={"All Messages"}
          columns={columns}
          rows={rows}
          rowHeight={200}
        />
      )}
    </AdminLayout>
  );
};

export default MessageManagement;
