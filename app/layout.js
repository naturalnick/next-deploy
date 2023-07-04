import Nav from "@components/Nav";
import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "@components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Seed Trading App",
	description: "Find and Trade Seeds",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Provider>
					<Nav />
					{children}
				</Provider>
			</body>
		</html>
	);
}
