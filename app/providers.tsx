"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, ThemeConfig } from "antd";
import lightTheme from "@/config/theme/lightThemeConfig";
import darkTheme from "@/config/theme/darkThemeConfig";
import ErrorBoundary from "@/components/error";

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
  const [antTheme, setAntTheme] = useState<ThemeConfig>(darkTheme);

  useEffect(() => {
    if (window) {
      window.addEventListener("theme", () => {
        const theme = window.localStorage.getItem("theme") ?? "dark";
        if (theme === "light") {
          setAntTheme(lightTheme);
        } else {
          setAntTheme(darkTheme);
        }
      });
    }
  }, []);

  return (
    <QueryClientProvider client={client}>
      <ConfigProvider theme={antTheme}>
        <NextUIProvider>
          <ErrorBoundary>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          </ErrorBoundary>
          <ToastContainer />
        </NextUIProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
