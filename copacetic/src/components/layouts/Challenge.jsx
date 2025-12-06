import { useState } from "react";
import ProgressBar from "../ProgressBar";
import { isEncountered, shuffle } from "../../utils";
import DEFINATIONS from "../../utils/VOCAB.json";

export default function Challenge(props) {
	const { day, daysWords, handleChangePage, handleIncrementAttempts, handleCompleteDay, PLAN } =
		props;

	const [wordIndex, setWordIndex] = useState(0);
	const [inputVal, setInputVal] = useState("");
	const [showDefination, setShowDefination] = useState(false);
	const [listToLearn, setListToLearn] = useState([
		...daysWords,
		...shuffle(daysWords),
		...shuffle(daysWords),
		...shuffle(daysWords),
	]);
	const word = listToLearn[wordIndex];
	const isNewWord = showDefination || (!isEncountered(day, word) && wordIndex < daysWords.length);
	const defination = DEFINATIONS[word];

	const giveUp = () => {
		setListToLearn([...listToLearn], word);
		setShowDefination(true);
	};
	return (
		<>
			<section id="challenge">
				<h1>{word}</h1>
				{isNewWord && <p> {defination}</p>}
				<div className="helper">
					<div>
						{/* Contains All the Error correction visual abar */}
						{[...Array(defination.length).keys()].map((char, elementIdx) => {
							///logic
							const styleToApply =
								inputVal.length < char + 1
									? " "
									: inputVal.split("")[elementIdx].toLowerCase() ==
									  defination.split("")[elementIdx].toLowerCase()
									? "correct"
									: "incorrect";

							return <div className={"" + styleToApply} key={elementIdx}></div>;
						})}
					</div>
					<input
						value={inputVal}
						onChange={(event) => {
							if (
								event.target.value.length == defination.length &&
								event.target.value.length > inputVal.length
							) {
								handleIncrementAttempts();
								if (event.target.value.toLowerCase() == defination.toLowerCase()) {
									if (wordIndex >= listToLearn.length - 1) {
										handleCompleteDay();
										return;
									}

									setWordIndex(wordIndex + 1);
									setShowDefination(false);
									setInputVal("");
									return;
								}
							}
							setInputVal(event.target.value);
						}}
						type="text"
						placeholder="Enter the defiantion..."
					></input>
				</div>
				<div className="challenge-btns">
					<button
						onClick={() => {
							handleChangePage(1);
						}}
						className="card-button-secondary"
					>
						<h6>Quit</h6>
					</button>
					<button
						onClick={() => {
							giveUp();
						}}
						className="card-button-primary"
					>
						<h6> I forgot</h6>
					</button>
				</div>
				<ProgressBar
					remainder={(wordIndex * 100) / listToLearn.length}
					text={`${wordIndex} / ${listToLearn.length}`}
				/>
			</section>
		</>
	);
}
