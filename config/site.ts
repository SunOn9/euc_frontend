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
      label: "Người dùng",
      href: "/dashboard/user",
    },
    {
      key: "member",
      label: "Thành viên",
      href: "/dashboard/member",
    },
    {
      key: "guest",
      label: "Khách",
      href: "/dashboard/guest",
    },
    {
      key: "club",
      label: "CLB",
      href: "/dashboard/club",
    },
    {
      key: "area",
      label: "Khu vực",
      href: "/dashboard/area",
    },
    {
      key: "payment",
      label: "Phiếu thu",
      href: "/dashboard/receiptSession",
    },
    {
      key: "receipt",
      label: "Phiếu chi",
      href: "/dashboard/paymentSession",
    },
    {
      key: "event",
      label: "Sự kiện",
      href: "/dashboard/event",
    },
  ] as navItem[],
  navUserSettingItems: [
    {
      key: "user-info",
      label: "Thông tin",
      href: "/dashboard/user/info",
    },
    {
      key: "logout",
      label: "Đăng xuất",
      href: "/logout",
    },
  ] as navItem[],
  links: {
    facebook: "https://www.facebook.com/FrisbeeNTC",
    instagram: "https://instagram.com/entixie.ultimate",
  },
};
