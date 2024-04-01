import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	Colors
} from "chart.js";
import convertToShortFormat from "./utils/shotFormat";
import useWindowWidth from "./utils/useWindowWidth";

interface DataItem {
	Year: string;
	Population: number;
}

interface ApiResponse {
	data: DataItem[];
}

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	Colors
);

const PopulationGraph: React.FC = () => {
	const [populationData, setPopulationData] = useState<any>({
		labels: [],
		datasets: []
	});
	const width = useWindowWidth();

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				"https://datausa.io/api/data?drilldowns=Nation&measures=Population"
			);
			const data: ApiResponse = await response.json();
			processChartData(data);
		};

		fetchData();
	}, []);

	const processChartData = (apiData: ApiResponse) => {
		const labels = apiData.data.map(item => item.Year);
		const data = apiData.data.map(item => item.Population);

		setPopulationData({
			labels,
			datasets: [
				{
					label: "Population",
					data,
					backgroundColor: [
						"#2AB7F6",
						"#C90CA4",
						"#1DF4A5",
						"#1B3A38",
						"#9A26CB",
						"#B55835"
					]
				}
			]
		});
	};

	return (
		<div>
			<h2 className='text-white font-bold text-center text-lg md:text-3xl my-4'>
				Nation Population Trends
			</h2>
			<Bar
				// height={`80%`}
				data={populationData}
				options={{
					layout: {
						padding: 20
					},
					scales: {
						y: {
							beginAtZero: true,
							ticks: {
								callback: function (value) {
									return convertToShortFormat(value);
								}
							},
							title: {
								display: true,
								text: "Population",
								font: {
									size:  width <= 426 ? 12 : 20,
									weight: "bolder"
								}
							}
						},
						x: {
							title: {
								display: true,
								text: "Year",
								font: {
									size:  width <= 426 ? 12 : 20,
									weight: "bolder"
								}
							}
						}
					},
					plugins: {
						legend: {
							display: false,
							position: "top"
						}
					},
					responsive: true,
					// maintainAspectRatio: false
					aspectRatio:  width <= 426
						? 1
						: width > 426 && width < 769
						? 2
						: width > 769 && width < 1025 ? 3 : 4
				}}
			/>
		</div>
	);
};

export default PopulationGraph;
