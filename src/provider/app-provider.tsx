"use client";
import { ReactNode } from "react";

import { EdgeStoreProvider } from "@/lib/edgestore";
import { Provider } from "react-redux";
import { store } from "@/lib/store";

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <EdgeStoreProvider> {children}</EdgeStoreProvider>
    </Provider>
  );
};

export default AppProvider;
