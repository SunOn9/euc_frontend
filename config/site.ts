export type SiteConfig = typeof siteConfig;

export type navItem = {
  key: string;
  label: string;
  href: string;
  children?: Omit<navItem, "children">[];
};

export const siteConfig = {
  name: "Entixie Ultimate",
  description: "Entixie Ultimate Club.",
  navItems: [
    {
      key: "home",
      label: "Home",
      href: "/dashboard",
    },
    {
      key: "user",
      label: "User",
      href: "/dashboard/user",
    },
    {
      key: "member",
      label: "Member",
      href: "/dashboard/member",
    },
    {
      key: "guest",
      label: "Guest",
      href: "/dashboard/guest",
    },
    {
      key: "club",
      label: "Club",
      href: "/dashboard/club",
    },
    {
      key: "area",
      label: "Area",
      href: "/dashboard/area",
    },
    {
      key: "payment",
      label: "Payment",
      href: "/dashboard/payment",
    },
    {
      key: "receipt",
      label: "Receipt",
      href: "/dashboard/receipt",
    },
    {
      key: "event",
      label: "Event",
      href: "/dashboard/event",
    },
  ] as navItem[],
  navUserSettingItems: [
    {
      key: "user-info",
      label: "User info",
      href: "/dashboard/user",
    },
    {
      key: "change-password",
      label: "Change password",
      href: "/dashboard/user/change-password",
    },
    {
      key: "logout",
      label: "Logout",
      href: "/dashboard/logout",
    },
  ] as navItem[],
  links: {
    facebook: "https://www.facebook.com/FrisbeeNTC",
    instagram: "https://instagram.com/entixie.ultimate",
  },
};
