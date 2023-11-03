export type SiteConfig = typeof siteConfig;

export type navItem = {
  key: string;
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Entixie Ultimate",
  description: "Entixie Ultimate Club.",
  navItems: [
    {
      key: "home",
      label: "Home",
      href: "/",
    },
    {
      key: "user",
      label: "User",
      href: "/user",
    },
  ] as navItem[],
  navUserSettingItems: [
    {
      key: "user-info",
      label: "User info",
      href: "/user",
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
