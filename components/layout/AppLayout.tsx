import React from "react";
import { AuthAwareNavbar } from "./AuthAwareNavbar";
import { Footer } from "../footer/Footer";
import { MainLayout } from "./MainLayout";

export function AppLayout({ children }: { children: React.ReactNode }) { return ( <MainLayout> <AuthAwareNavbar /> <main className="flex-1 w-full bg-background relative">{children}</main> <Footer /> </MainLayout> ); }
