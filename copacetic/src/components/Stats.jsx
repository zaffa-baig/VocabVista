import ProgressBar from "./ProgressBar";
import { calcLevel, calculateAccuracy, calculateNewWords } from "../utils";
export default function Stats(props) {
	const { name, day, attemps, PLAN } = props;

	// const day = 16;
	const currlvl = calcLevel(day);
	const flooredlvl = Math.floor(currlvl);
	const remainder = (currlvl - flooredlvl) * 100;

	return (
		<>
			<div className="card stats-card">
				<div className="welcome-text">
					<h6>Welcome</h6>
					<h4 className="text-large"> {name} </h4>
				</div>

				<div className="stats-column">
					<div>
						<p> Streak 🔥</p>
						<h4>{day - 1}</h4>
					</div>
					<div>
						<p> Words seen</p>
						<h4>{calculateNewWords(day - 1)}</h4>
					</div>
					<div>
						<p> Accuracy (%)</p>
						<h4>{(calculateAccuracy(attemps, day) * 100).toFixed(1)}</h4>
					</div>
				</div>

				<ProgressBar text={`lvl ${flooredlvl}`} remainder={remainder} />
			</div>
		</>
	);
}
