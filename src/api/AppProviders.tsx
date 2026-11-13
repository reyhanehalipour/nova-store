"use client";

import { useEffect } from "react";
import type { ThemeMode } from "@/types";
import { ThemeProvider } from "@/context/ThemeContext";
import { QueryProvider } from "@/api/QueryProvider";
import { StyledComponentsRegistry } from "@/shared/StyledComponentsRegistry";
import { useCartStore } from "@/storage/cartStore";

function CartHydrator({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);
  return <>{children}</>;
}

export function AppProviders({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: ThemeMode;
}) {
  return (
    <StyledComponentsRegistry>
      <QueryProvider>
        <ThemeProvider initialTheme={initialTheme}>
          <CartHydrator>{children}</CartHydrator>
        </ThemeProvider>
      </QueryProvider>
    </StyledComponentsRegistry>
  );
}
