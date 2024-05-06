import "@/app/globals.css";
import { SessionProvider } from "next-auth/react";
export default function AuthLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html>
			<SessionProvider>
			<body>{children}</body>
			</SessionProvider>
		</html>
	);
}
