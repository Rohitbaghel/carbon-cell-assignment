import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PopulationGraph from "./components/PopulationGraph";
import CryptoPrices from "./components/CryptoPrices";


const App = () => {
	return (
		<Router>
			<Navbar />
			{/* <NavbarHook /> */}
			<main className='main-content'>
        <PopulationGraph />
        <CryptoPrices/>
			</main>
		</Router>
	);
};

export default App;
