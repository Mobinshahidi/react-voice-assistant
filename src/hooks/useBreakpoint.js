import { useEffect, useRef, useState } from 'react';

const breakpointValueCalculator = (width, { lg, base, md, sm, fallback }) => {
	if (0 < width && width < 600) {
		return base || fallback;
	}
	if (600 < width && width < 960) {
		return sm || fallback;
	}
	if (960 < width && width < 1280) {
		return md || fallback;
	}
	if (width >= 1280) {
		return lg || fallback;
	}
	return fallback;
};

export const useBreakpointValue = ({
	base,
	sm = base,
	md = sm,
	lg = md,
	fallback = null,
}) => {
	const [breakpoint, setBreakPoint] = useState(
		breakpointValueCalculator(window.innerWidth, {
			base,
			sm,
			md,
			lg,
			fallback,
		}),
	);

	useEffect(() => {
		const handleResize = () => {
			setBreakPoint(
				breakpointValueCalculator(window.innerWidth, {
					base,
					sm,
					md,
					lg,
					fallback,
				}),
			);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return breakpoint;
};
