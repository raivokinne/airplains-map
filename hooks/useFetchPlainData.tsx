"use client";

import { useEffect, useState } from "react";

export default function useFetchPlainData() {

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			setError(null);

			try {
				const response = await fetch('https://opensky-network.org/api/states/all', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Basic ' + btoa('RaivoKinne:Rembo276@'),
					},
				});
				const data = await response.json();
				setData(data);
			} catch (error) {
				if (error instanceof Error) {
					setError(error);
				}
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	return { data, loading, error };
}

