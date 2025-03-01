import { Route, Routes } from "react-router";
import Home from "@/pages/Home";
import "./app.css";
const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
		</Routes>
	);
};

export default App;
