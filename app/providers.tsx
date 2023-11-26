"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import lightTheme from "@/config/theme/lightThemeConfig";
import darkTheme from "@/config/theme/darkThemeConfig";

const NextUIProvider = dynamic(
  () => import("@nextui-org/system").then((module) => module.NextUIProvider),
  {
    ssr: false,
  }
);

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const [client] = useState(new QueryClient());

  const { theme, setTheme } = useTheme();

  const antDesignTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <QueryClientProvider client={client}>
      <NextUIProvider>
        <ConfigProvider theme={antDesignTheme}>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          <ToastContainer />
        </ConfigProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
