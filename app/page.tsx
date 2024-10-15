"use client";

import Map from "@/components/Map";
import useFetchPlainData from "@/hooks/useFetchPlainData";

export default function Home() {
	const { data, error } = useFetchPlainData();

	if (error) return <p>Error: {error.message}</p>;

	return (
		<>
			<Map planeData={data} />
		</>
	)
}
