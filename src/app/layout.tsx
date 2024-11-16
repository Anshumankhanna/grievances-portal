import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Banner from "@/components/Banner/Banner";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import Background from "@/components/Background/Background";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Grievances Portal",
	description: "This is the grievances portal for MSIT",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col`}
			>
				<Banner />
				<NavBar />
				<Background>
					{children}
				</Background>
				<Footer />
			</body>
		</html>
	);
}
