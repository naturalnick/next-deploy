"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";

function Nav() {
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		async function loadProviders() {
			const response = await getProviders();

			setProviders(response);
		}
		loadProviders();
	}, []);

	return (
		<nav className="flex justify-between items-center w-full mb-16 pt-3 p-4 bg-slate-100">
			<Link href="/" className="flex gap-2 flex-center">
				<h1 className="text-2xl">SeedforSeed</h1>
			</Link>

			{/* Desktop Nav */}
			<div className="sm:flex hidden">
				{session?.user ? (
					<div className="flex gap-3">
						<Link href="/feed" className="px-4 py-1">
							Feed
						</Link>
						<button
							onClick={signOut}
							type="button"
							className="border border-black px-4 py-1 bg-white rounded-full"
						>
							Sign Out
						</button>
						<Image
							src={session.user.image}
							width={37}
							height={37}
							className="rounded-full"
							alt="menu"
							onClick={() => setMenuOpen((prev) => !prev)}
						/>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signIn(provider.id)}
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>

			{/* Mobile Nav */}
			<div className="sm:hidden flex relative">
				{session?.user ? (
					<div className="flex">
						<Image
							src={session.user.image}
							width={37}
							height={37}
							className="rounded-full"
							alt="menu"
							onClick={() => setMenuOpen((prev) => !prev)}
						/>
						{menuOpen && (
							<div className="absolute right-0 top-full mt-3 w-full p-5 rounded-lg bg-white border min-w-[210px] flex flex-col gap-2 justify-end items-end">
								<Link href="/feed" onClick={() => setMenuOpen(false)}>
									Feed
								</Link>
								<Link href="/mypod" onClick={() => setMenuOpen(false)}>
									My Pod
								</Link>
								<button
									onClick={signOut}
									type="button"
									className="border border-black px-4 py-1 mt-3 bg-black text-white rounded-full"
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signIn(provider.id)}
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
}

export default Nav;
