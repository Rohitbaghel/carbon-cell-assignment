import { useEffect, useState } from "react";
import PriceCard from "./PriceCard";

interface CurrencyDetail {
	code: string;
	symbol: string;
	rate: string;
	description?: string;
	rate_float: number;
}

const CryptoPrices: React.FC = () => {
	const [prices, setPrices] = useState<{ [key: string]: CurrencyDetail }>({});

	function convertObjectToArray(obj: { [key: string]: CurrencyDetail }) {
		return Object.entries(obj).map(([key, value]) => ({
			...value,
			currency: key
		}));
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"https://api.coindesk.com/v1/bpi/currentprice.json"
				);
				const data = await response.json();
				setPrices(data.bpi);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

    const getMarketTrend = (currency: string) => {
		return currency === "USD" ? "Positive" : "Negative";
	};

	return (
		<div className='flex justify-center flex-wrap'>
			{convertObjectToArray(prices).map(detail => (
				<PriceCard
					key={detail.code}
					currency={detail.currency}
					symbol={detail.symbol}
					rate={detail.rate}
					description={detail.currency}
					marketTrend={getMarketTrend(detail.currency)}
				/>
			))}
		</div>
	);
};

export default CryptoPrices;