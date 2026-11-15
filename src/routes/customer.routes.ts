const prefix = "/customer";

export const customerRoutes = [
  {
    items: [
      {
        title: "Home",
        url: `${prefix}`,
      },
      {
        title: "Book Service",
        url: `${prefix}/book`,
      },
      {
        title: "My Service Requests",
        url: `${prefix}/requests`,
      },
      {
        title: "Payments",
        url: `${prefix}/my-payments`,
      },
    ],
  },
];
