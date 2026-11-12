const prefix = "/admin";

export const adminRoutes = [
  {
    items: [
      {
        title: "Stats",
        url: `${prefix}`,
      },
      {
        title: "Users",
        url: `${prefix}/users`,
      },
      {
        title: "Technician Applications",
        url: `${prefix}/applications`,
      },
      {
        title: "Create Service Category",
        url: `${prefix}/categories`,
      },
      {
        title: "Payments",
        url: `${prefix}/payments`,
      },
      {
        title: "Service Requests",
        url: `${prefix}/service-requests`,
      },
      {
        title: "Audit Logs",
        url: `${prefix}/audit-logs`,
      },
    ],
  },
];
