import { Suspense } from "react";

const SuspenseComponent = ({ children }) => {
	return (
		<Suspense fallback={<p className="">Loading...</p>}>{children}</Suspense>
	);
};

export default SuspenseComponent;
