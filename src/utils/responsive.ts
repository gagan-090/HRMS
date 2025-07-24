import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions for iPhone 11 Pro (common mobile reference)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

const widthBaseScale = SCREEN_WIDTH / BASE_WIDTH;
const heightBaseScale = SCREEN_HEIGHT / BASE_HEIGHT;

// Device type detection
const isSmallDevice = () => SCREEN_WIDTH < 375;
const isMediumDevice = () => SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
const isLargeDevice = () => SCREEN_WIDTH >= 414;
const isTablet = () => SCREEN_WIDTH >= 600;

// Enhanced normalize function for better mobile scaling
function normalize(size: number, based: 'width' | 'height' = 'width') {
  const scale = based === 'height' ? heightBaseScale : widthBaseScale;
  
  // Better scaling for different device sizes
  let finalScale = scale;
  
  if (isSmallDevice()) {
    // Slightly reduce scaling for small devices to prevent cramping
    finalScale = Math.max(scale * 0.95, 0.85);
  } else if (isTablet()) {
    // Cap scaling for tablets to prevent oversized elements
    finalScale = Math.min(scale, 1.2);
  } else {
    // Standard scaling for medium and large phones
    finalScale = Math.min(scale, 1.1);
  }

  const newSize = size * finalScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

// Enhanced responsive functions
const widthPixel = (size: number) => normalize(size, 'width');
const heightPixel = (size: number) => normalize(size, 'height');
const fontPixel = (size: number) => {
  // Special font scaling for better readability
  const scale = heightBaseScale;
  let finalScale = scale;
  
  if (isSmallDevice()) {
    finalScale = Math.max(scale * 0.9, 0.8);
  } else if (isTablet()) {
    finalScale = Math.min(scale, 1.15);
  } else {
    finalScale = Math.min(scale, 1.05);
  }
  
  const newSize = size * finalScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Additional responsive utilities for mobile-first design
const responsiveWidth = (percentage: number) => (SCREEN_WIDTH * percentage) / 100;
const responsiveHeight = (percentage: number) => (SCREEN_HEIGHT * percentage) / 100;

// Spacing utilities for consistent mobile layout
const spacing = {
  xs: widthPixel(4),
  sm: widthPixel(8),
  md: widthPixel(16),
  lg: widthPixel(24),
  xl: widthPixel(32),
  xxl: widthPixel(48),
};

// Mobile-optimized component sizes
const componentSizes = {
  buttonHeight: heightPixel(48),
  inputHeight: heightPixel(44),
  headerHeight: heightPixel(56),
  tabBarHeight: heightPixel(60),
  cardPadding: widthPixel(16),
  screenPadding: widthPixel(20),
};

export {
  widthPixel,
  heightPixel,
  fontPixel,
  SCREEN_WIDTH as screenWidth,
  SCREEN_HEIGHT as screenHeight,
  responsiveWidth,
  responsiveHeight,
  spacing,
  componentSizes,
  isSmallDevice,
  isMediumDevice,
  isLargeDevice,
  isTablet,
};
