"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

function Profile() {
	const { data: session } = useSession();

	return (
		<div className="m-10 p-10 rounded-md border border-slate-300 grid grid-cols-2">
			<div>
				<div className="flex items-center gap-3">
					<Image
						src={session?.user.image}
						width={60}
						height={60}
						className="rounded-full"
						alt="profile"
					/>
					<p className="font-bold">{session?.user.name}</p>
				</div>
			</div>
			<div>
				<h3>My pod</h3>
				<small>Set your available seeds</small>
			</div>
		</div>
	);
}

export default Profile;
