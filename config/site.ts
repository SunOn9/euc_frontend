export type SiteConfig = typeof siteConfig;

export type navItem = {
  key: string;
  label: string;
  href: string;
  children?: Omit<navItem, 'children'>[]
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
      children: [{
        key: "create-user",
        label: "Create User",
        href: "/dashboard/user/create",
      }]
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
      href: "/2",
    },
    {
      key: "logout",
      label: "Logout",
      href: "/3",
    },
  ] as navItem[],
  links: {
    facebook: "https://www.facebook.com/FrisbeeNTC",
    instagram: "https://instagram.com/entixie.ultimate",
  },
};
