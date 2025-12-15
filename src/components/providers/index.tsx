import { SidebarProvider } from "../ui/sidebar";
import { Toaster } from "../ui/toaster";
import NextAuthProvider from "./_components/next-auth.provider";
import ReactQueryProvider from "./_components/react-query.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <ReactQueryProvider>
        <SidebarProvider>
          {/* <SidebarTrigger /> */}
          <Toaster />
          {children}
        </SidebarProvider>
      </ReactQueryProvider>
    </NextAuthProvider>
  );
}
