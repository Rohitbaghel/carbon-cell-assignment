import React from "react";
import { FaBitcoin, FaChartLine, FaInfoCircle } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";

interface PriceCardProps {
	currency: string;
	symbol: string;
	rate: string;
	description: string; 
	marketTrend: string; // Example: "Positive" or "Negative"
}

const PriceCard: React.FC<PriceCardProps> = ({
	currency,
	symbol,
	rate,
	description,
	marketTrend
}) => {
	const formatRate = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency
	}).format(Number(rate.replace(",", "")));

	return (
		<div className='transition duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-1 rounded-lg overflow-hidden m-4 bg-white shadow-md w-80'>
			<div className='px-6 py-4'>
				<div className='flex items-center justify-between'>
					<FaBitcoin className='text-yellow-500 text-3xl' />
					<span className='font-bold text-xl text-gray-800'>
						Bitcoin
					</span>
					<span
						className={`text-sm font-semibold ${
							currency === "USD"
								? "text-green-500"
								: "text-blue-500"
						}`}
					>
						{currency}
					</span>
				</div>
				<p className='text-gray-700 text-opacity-80 text-lg font-semibold mt-2'>
					{formatRate}
				</p>
				<p className='text-gray-600 text-sm mt-2'>
					<FaInfoCircle className='inline text-gray-500 mr-1' />
					{description}
				</p>
			</div>
			<div className='px-6 py-2 flex justify-between items-center border-t'>
				<div className='flex items-center'>
					<FaChartLine
						className={`text-lg ${
							marketTrend === "Positive"
								? "text-green-500"
								: "text-red-500"
						}`}
					/>
					<span className='ml-1 text-sm'>{marketTrend} Trend</span>
				</div>
				{/* <MdAttachMoney className='text-2xl text-gray-700' /> */}
				<p
					dangerouslySetInnerHTML={{ __html: symbol }}
					className='font-bold text-gray-500'
				></p>
			</div>
			<div className='px-6 pt-4 pb-2 flex justify-end'>
				<span className='inline-block bg-gradient-to-r from-green-400 to-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2'>
					{currency === "USD" ? "Trending" : "Stable"}
				</span>
			</div>
		</div>
	);
};

export default PriceCard;
