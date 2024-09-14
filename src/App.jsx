import RouteController from "./routes";
import { useLocation } from "react-router-dom";
import Nav from "./components/nav/Nav";

function App() {
	const location = useLocation();

	return (
		<>
			{location.pathname !== "/auth/login" &&
				location.pathname !== "/auth/signup" && <Nav />}
			<RouteController />
		</>
	);
}

export default App;
