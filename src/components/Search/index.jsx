import React from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";

export function Search({ setSearchValue, setPage }) {
	const [value, setValue] = React.useState("");
	const inputEl = React.useRef(null);

	function clearInput() {
		setValue("");
		setSearchValue("");
		inputEl.current.focus();
	}
	// eslint-disable-next-line
	const onUpdate = React.useCallback(
		debounce((value) => {
			setSearchValue(value);
			setPage(1);
		}, 350),
		[]
	);
	const onChangeInput = (event) => {
		setValue(event.target.value);
		onUpdate(event.target.value);
	};

	return (
		<div className={styles.root}>
			<svg
				className={styles.svg}
				height="20px"
				viewBox="0 0 512 512"
				width="20px">
				<path
					d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z"
					fill="#2c2c2c"
					stroke="#2c2c2c"
				/>
			</svg>
			<input
				className={styles.input}
				ref={inputEl}
				value={value}
				maxLength={25}
				type="text"
				placeholder="Поиск пиццы"
				onChange={onChangeInput}
			/>
			{value && (
				<img
					onClick={clearInput}
					className={styles.delete}
					src="/img/delete.svg"
					alt="clear"
				/>
			)}
		</div>
	);
}
