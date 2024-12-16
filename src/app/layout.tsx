import type { Metadata } from "next";
import "./globals.css";
import QueryClientContextProvider from "./lib/query-client-provider";
import { ApolloProvider } from "./lib/ApolloProvider";

export const metadata: Metadata = {
  title: "Team Flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("Children:", children); // Should show the React node from page.tsx

  return (
    <QueryClientContextProvider>
      <ApolloProvider>
        <html lang="en">
          <head>
            <title>Team Flow | Home</title>
          </head>
          <body>{children}</body>
        </html>
      </ApolloProvider>
    </QueryClientContextProvider>
  );
}
