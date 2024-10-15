export const BREAKPOINT = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1440,
};

export const isMobile = (width: number) => width < BREAKPOINT.MOBILE;

export const isTablet = (width: number) =>
  width >= BREAKPOINT.MOBILE && width < BREAKPOINT.TABLET;

export const isDesktop = (width: number) => width >= BREAKPOINT.TABLET;
