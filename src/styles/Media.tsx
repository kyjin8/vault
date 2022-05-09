export const breakpoints = {
	/**
	 * 모바일
	 */
	mobile: 360,
	/**
	 * 태블릿
	 */
	tablet: 600,
	/**
	 * 데스크탑
	 */
	desktop: 900,
	/**
	 * 데스크탑 최대
	 */
	largeDesktop: 1200,
};

export const over = (point: number) => `(min-width: ${point}px)`;

export const under = (point: number) => `(max-width: ${point - 1}px)`;
