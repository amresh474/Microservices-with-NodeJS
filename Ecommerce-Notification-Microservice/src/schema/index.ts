import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
  } from "graphql";
  import NotificationType from "./Notification";
  import * as NotificationService from "../services/notificationService";
  
  // Queries
  const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      // Query to get all notifications
      notifications: {
        type: new GraphQLList(NotificationType),
        resolve: async () => NotificationService.getAllNotifications(),
      },
  
      // Query to get a notification by ID
      notification: {
        type: NotificationType,
        args: { id: { type: new GraphQLNonNull(GraphQLString) } },
        resolve: async (_, args) =>
          NotificationService.getNotificationById(args.id),
      },
    },
  });
  
  // Mutations
  const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
      // Mutation to add a new notification
      addNotification: {
        type: NotificationType,
        args: {
          title: { type: new GraphQLNonNull(GraphQLString) },
          text: { type: new GraphQLNonNull(GraphQLString) },
          userId: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (
          _,
          args: { title: string; text: string; userId: string }
        ) => NotificationService.addNotification(args),
      },
  
      updateNotification: {
        type: NotificationType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) },
          title: { type: new GraphQLNonNull(GraphQLString) },
          text: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (_, args: { id: string; title: string; text: string }) =>
          NotificationService.updateNotification(args),
      },
  
      deleteNotification: {
        type: NotificationType,
        args: { id: { type: new GraphQLNonNull(GraphQLString) } },
        resolve: async (_, args) =>
          NotificationService.deleteNotification(args.id),
      },
    },
  });
  
  export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
  });