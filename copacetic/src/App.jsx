import { useState, useEffect } from "react";
import Challenge from "./components/layouts/Challenge";
import Dashboard from "./components/layouts/Dashboard";
import Layout from "./components/layouts/Layout";
import Welcome from "./components/layouts/Welcome";

import WORDS from "./utils/VOCAB.json";
import { countdownIn24Hours, getWordByIndex, PLAN } from "./utils";

function App() {
	const [selectedPage, setSelectedPage] = useState(0);

	const handleChangePage = (index) => {
		setSelectedPage(index);
	};

	const [name, setName] = useState("");

	const [day, setDay] = useState(1);
	const [dateTime, setDatetime] = useState(null);
	const [history, setHistory] = useState({});
	const [attempts, setAttempts] = useState(0);

	const daysWords = PLAN[day].map((idx) => {
		return getWordByIndex(WORDS, idx).word;
	});

	const handleCreateAccount = () => {
		if (!name) {
			return;
		}
		localStorage.setItem("userName", name);
		handleChangePage(1);
	};

	const handleCompleteDay = () => {
		const newDay = day + 1;
		const newDateTime = Date.now();
		setDay(newDay);
		setDatetime(newDateTime);
		localStorage.setItem(
			"day",
			JSON.stringify({
				day: newDay,
				dateTime: newDateTime,
			})
		);

		setSelectedPage(1);
	};

	const handleIncrementAttempts = () => {
		const newRecords = attempts + 1;
		localStorage.setItem("attempts", newRecords);
		setAttempts(newRecords);
	};
	useEffect(() => {
		if (!localStorage) {
			return;
		}
		if (localStorage.getItem("userName")) {
			setName(localStorage.getItem("userName"));
			setSelectedPage(1);
		}

		if (localStorage.getItem("attempts")) {
			setAttempts(parseInt(localStorage.getItem("attempts")));
		}
		if (localStorage.getItem("histroy")) {
			setHistory(JSON.parse(localStorage.getItem("history")));
		}

		if (localStorage.getItem("day")) {
			let { day: d, datetime: dt } = JSON.parse(localStorage.getItem("day"));
			setDatetime(dt);
			setDay(d);

			if (d > 1 && dt) {
				const diff = countdownIn24Hours(dt);
				if (diff < 0) {
					console.log("Failed challenge");
					let newHistroy = { ...history };
					const timesstamp = new Date(dt);
					const formattedTimestamp = timesstamp
						.toString()
						.split("")
						.slice(1, 4)
						.join(" ");
					newHistroy[formattedTimestamp] = d;
					setHistory(newHistroy);
					setDay(1);
					setDatetime(null);
					setAttempts(0);
					localStorage.setItem("attempts", 0);
					localStorage.setItem("history", JSON.stringify(newHistroy));
					localStorage.setItem("day", JSON.stringify({ day: 1, datatime: null }));
				}
			}
		}
	}, []);
	const pages = {
		0: <Welcome setName={setName} name={name} handleCreateAccount={handleCreateAccount} />,
		1: (
			<Dashboard
				name={name}
				attempts={attempts}
				PLAN={PLAN}
				day={day}
				handleChangePage={handleChangePage}
				daysWords={daysWords}
				datetime={dateTime}
				history={history}
			/>
		),
		2: (
			<Challenge
				day={day}
				handleChangePage={handleChangePage}
				daysWords={daysWords}
				PLAN={PLAN}
				handleIncrementAttempts={handleIncrementAttempts}
				handleCompleteDay={handleCompleteDay}
			/>
		),
	};
	return (
		<>
			<Layout>{pages[selectedPage]}</Layout>
		</>
	);
}

export default App;
