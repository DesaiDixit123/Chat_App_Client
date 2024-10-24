import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
  tagTypes: ["Chat", "User","Message"],
  endpoints: (builder) => ({
    myChat: builder.query({
      query: () => ({
        url: "/my",
        credentials: "include",
      }),

      providesTags: ["Chat"],
    }),
    
    searchUser: builder.query({
      query: (name) => ({
        url: `/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "/sendrequest",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getNotifications: builder.query({
      query: () => ({
        url: `/notifications`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "/acceptrequest",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),

    chatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `/chat/${chatId}`;

        if (populate) url += "?populate=true";

        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),

    getMessages: builder.query({
      query: ({ chatId, page }) => ({
        url:`/chat/message/${chatId}?page=${page}`,
        credentials: "include",
      }),

keepUnusedDataFor:0
    }),

    sendAttachments: builder.mutation({
      query: (data) => ({
        url: "/chat/message",
        method: "POST",
        credentials: "include",
        body: data,
      }),
     
    }),


    myGroup: builder.query({
      query: () => ({
        url: "/my/groups",
        credentials: "include",
      }),

      providesTags: ["Chat"],
    }),


    availableFriends: builder.query({
      query: (chatId) => {
        let url = `/friends`;

        if (chatId) url += `?chatId=${chatId}`;

        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),


    newGroup: builder.mutation({
      query: ({name,members}) => ({
        url: "/group/new",
        method: "POST",
        credentials: "include",
        body: {name,members},
      }),

      invalidatesTags:["Chat"]

     
    }),

    renameGroup: builder.mutation({
      query: ({chatId,name}) => ({
        url: `/chat/${chatId}`,
        method: "PUT",
        credentials: "include",
        body: {name},
      }),
      invalidatesTags: ["Chat"],
    }),
    removeGroupMember: builder.mutation({
      query: ({chatId,userId}) => ({
        url: `/removemembers`,
        method: "DELETE",
        credentials: "include",
        body: {chatId,userId},
      }),
      invalidatesTags: ["Chat"],
    }),
    addGroupMembers: builder.mutation({
      query: ({chatId, members}) => ({
        url: `/addmembers`,
        method: "PUT",
        credentials: "include",
        body: {chatId, members},
      }),
      invalidatesTags: ["Chat"],
    }),

    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `/chat/${chatId}`,
        method: "DELETE",
        credentials: "include",
     
      }),
      invalidatesTags: ["Chat"],
    }),
    leaveGroup: builder.mutation({
      query: (chatId) => ({
        url: `/leave/${chatId}`,
        method: "DELETE",
        credentials: "include",
     
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export default api;

export const {
  useMyChatQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationsQuery,
  useAcceptFriendRequestMutation,
  useChatDetailsQuery,
  useGetMessagesQuery,
  useSendAttachmentsMutation,
  useMyGroupQuery,
  useAvailableFriendsQuery,
  useNewGroupMutation,
  useRenameGroupMutation,
  useRemoveGroupMemberMutation,
  useAddGroupMembersMutation,
  useDeleteChatMutation,
  useLeaveGroupMutation
} = api;
