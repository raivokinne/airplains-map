"use client";

import Map from "@/components/Map";
import useFetchPlainData from "@/hooks/useFetchPlainData";

const HomePage = () => {
	const { data, error } = useFetchPlainData();

	if (error) return <p>Error: {error.message}</p>;

	return (
		<>
			<Map planeData={data} />
		</>
	);
};

export default HomePage;
