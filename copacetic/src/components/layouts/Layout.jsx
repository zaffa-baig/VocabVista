export default function Layout(props) {
	const { children } = props;
	return (
		<>
			<header>
				<h1 className="text-graient">Copacetic</h1>
			</header>

			<main>{children}</main>

			<footer>
				<small>Created By</small>
				<a target="_blank" href="https://github.com/zaffa-baig">
					<img
						alt="pfp"
						src="https://avatars.githubusercontent.com/u/28562120?s=96&v=4"
					/>
					<p>@zaffar</p>
					<i className="fa-brands fa-github"></i>
				</a>
			</footer>
		</>
	);
}
