import "@/app/ui/global.css";
import { inter } from "./ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		template: "%s | ProfessionDriver Dashboard",
		default: "ProfessionDriver",
	},
	description: "Original application for Professional Drivers",
	metadataBase: new URL("https://linkedin.com/in/artur-bula/"),
};
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>{children}</body>
		</html>
	);
}
