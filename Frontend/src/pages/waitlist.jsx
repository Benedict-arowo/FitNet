import { useState } from "react";
import waitlist_hammer from "../assets/waitlist_hammer.png";
import { API_URL } from "../../config";
import { Message } from "primereact/message";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";

const Waitlist = () => {
	const [email, setEmail] = useState("");
	const [err, setErr] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showCongratsDialog, setShowCongratsDialog] = useState(false);

	const handleSubmit = (e) => {
		// Reset last error if any
		setErr(null);
		e.preventDefault();
		// Check if an email has been provided.
		if (email.length === 0) return setErr("Please enter a valid email.");
		setIsLoading(true);
		fetch(API_URL + "/waitlist", {
			method: "POST",
			body: JSON.stringify({ email }),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.status === 409)
					throw new Error("You are already on the waitlist.");
				if (response.status === 400)
					throw new Error("Invalid email address provided.");
				if (!response.ok)
					throw new Error(
						"Error while trying to add you to waitlist."
					);
				return response;
			})
			.then((data) => {
				console.log("success");
				console.log(data);
				setShowCongratsDialog(true);
				// Reset email value
				setEmail("");
			})
			.catch((err) => {
				setErr(err.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	return (
		<main className="w-screen min-h-screen h-full px-8 pt-8 pb-2 relative flex flex-col justify-between">
			<section className="mb-4">
				<Dialog
					visible={showCongratsDialog}
					closeOnEscape={true}
					draggable={false}
					onHide={() => setShowCongratsDialog(false)}>
					<div>
						<h4 className="text-neutral-600 font-medium text-3xl">
							Thank you!
						</h4>
						<p className="text-neutral-400">
							Successfully added you to our waitlist!
						</p>
					</div>
				</Dialog>

				<header className="font-medium md:text-xl bg-neutral-600 mx-auto text-white py-2 px-4 md:px-8 rounded-full w-fit">
					<p>FitNet is Launching Soon</p>
				</header>
				<section className="mt-20">
					<p className="text-6xl md:text-8xl font-normal text-center text-neutral-600">
						Join our waitlist for <br />{" "}
						<span className="font-bold text-black">FitNet</span>
					</p>
					<p className="mt-6 text-center max-w-[450px] mx-auto">
						Join our fitness community! Find your next workout,
						connect with trainers, and track your progress - all at
						your fingertips
					</p>
				</section>
				<form onSubmit={handleSubmit}>
					<div className="flex items-center outline gap-2 px-4 py-3 rounded-full max-w-[450px] mx-auto mt-12 outline-2 focus-within:outline-orange-400 focus-within:text-orange-400 duration-300">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6">
							<path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
							<path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
						</svg>

						<input
							className="w-full outline-none text-lg text-neutral-900"
							name="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email address"
						/>
					</div>
					<div className="w-full flex flex-col items-center mt-3 justify-center">
						{isLoading && (
							<ProgressSpinner
								className="w-[40px] h-fit"
								aria-label="Loading"
							/>
						)}
						{err && <Message severity="error" text={err} />}
						<button
							className="px-12 text-white bg-neutral-700 py-2 rounded-lg text-sm mt-2 w-fit cursor-pointer duration-300 hover:bg-neutral-800 hover:shadow-xl "
							type="submit">
							Join the waitlist
						</button>
					</div>
				</form>
			</section>

			<footer className="w-full flex justify-center">
				<span className="text-center">
					COPYRIGHT 2024 © ALL RIGHTS RESERVED
				</span>
			</footer>
			<img
				className="fixed bottom-0 sm:block hidden -left-4"
				src={waitlist_hammer}
				alt="an hammer"
			/>
		</main>
	);
};

export default Waitlist;
