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
      children: [
        {
          key: "manager-user",
          label: "Manager User",
          href: "/dashboard/user",
        },
        {
          key: "create-user",
          label: "Create User",
          href: "/dashboard/user/create",
        },
      ],
    },
    {
      key: "member & guest",
      label: "Member & Guest",
      href: "/dashboard/member",
      children: [
        {
          key: "manager-member",
          label: "Manager Member",
          href: "/dashboard/member",
        },
        {
          key: "create-member",
          label: "Create Member",
          href: "/dashboard/member/create",
        },
      ],
    },
    {
      key: "club",
      label: "Club",
      href: "/dashboard/member",
      children: [
        {
          key: "manager-member",
          label: "Manager Member",
          href: "/dashboard/member",
        },
        {
          key: "create-member",
          label: "Create Member",
          href: "/dashboard/member/create",
        },
      ],
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
