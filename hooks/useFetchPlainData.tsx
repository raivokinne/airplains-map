"use client";

import { useEffect, useState } from "react";

export default function useFetchPlainData() {

	const [data, setData] = useState([]);
	const [error, setError] = useState<Error | null>(null);


	useEffect(() => {
		async function fetchData() {
			setError(null);

			try {
				const response = await fetch('https://opensky-network.org/api/states/all', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Basic ' + btoa('eaterz:9KSYgtbKB6@7aPY'),
					},
				});
				const data = await response.json();
				setData(data);
			} catch (error) {
				if (error instanceof Error) {
					setError(error);
				}
			}
		}

		fetchData();
		const interval = setInterval(fetchData, 10000);

		return () => clearInterval(interval);
	}, []);

	return { data, error };
}

