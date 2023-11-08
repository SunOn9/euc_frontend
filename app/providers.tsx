"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import dynamic from "next/dynamic";

import { Provider } from "react-redux";
import store from "@/store/store";

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
  return (
    <Provider store={store}>
      <NextUIProvider>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </NextUIProvider>
    </Provider>
  );
}
