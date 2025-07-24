import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  PixelRatio,
  Animated,
  Platform,
  Easing
} from 'react-native';
import Svg, { Path, Circle, Rect, Line, Polyline, G, Ellipse } from 'react-native-svg';

// Import responsive utilities
import { widthPixel, heightPixel, fontPixel, screenWidth, screenHeight } from '../utils/responsive';
// Import theme context
import { useTheme } from '../context/ThemeContext';

// --- CustomSvgIcon Component ---
interface CustomSvgIconProps {
  name: string;
  size: number;
  color: string | Animated.AnimatedInterpolation<string | number>;
  style?: object;
}

const CustomSvgIcon: React.FC<CustomSvgIconProps> = ({ name, size, color, style }) => {
  const safeColor = color || 'black'; // Fallback color
  let iconPath;

  switch (name) {
    case 'menu':
      iconPath = (
        <G>
          <Line x1="3" y1="12" x2="21" y2="12" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
          <Line x1="3" y1="6" x2="21" y2="6" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
          <Line x1="3" y1="18" x2="21" y2="18" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
        </G>
      );
      break;
    case 'search':
      iconPath = (
        <G>
          <Circle cx="11" cy="11" r="8" stroke={safeColor} strokeWidth="2" />
          <Line x1="21" y1="21" x2="16.65" y2="16.65" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
        </G>
      );
      break;
    case 'bell':
      iconPath = (
        <G>
          <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'chevron-down':
      iconPath = <Path d="M6 9l6 6 6-6" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />;
      break;
    case 'chevron-right':
      iconPath = <Path d="M9 18l6-6-6-6" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />;
      break;
    case 'chevron-left':
      iconPath = <Path d="M15 18l-6-6 6-6" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />;
      break;
    case 'sun':
      iconPath = (
        <G>
          <Circle cx="12" cy="12" r="5" stroke={safeColor} strokeWidth="2" />
          <Line x1="12" y1="1" x2="12" y2="3" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
          <Line x1="12" y1="21" x2="12" y2="23" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
          <Line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
          <Line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
          <Line x1="1" y1="12" x2="3" y2="12" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
          <Line x1="21" y1="12" x2="23" y2="12" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
          <Line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
          <Line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
        </G>
      );
      break;
    case 'moon': // Moon icon path
      iconPath = (
        <G>
          <Path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'users':
      iconPath = (
        <G>
          <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Circle cx="9" cy="7" r="4" stroke={safeColor} strokeWidth="2" />
          <Path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M16 3.13a4 4 0 0 1 0 7.75" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'check-circle':
      iconPath = (
        <G>
          <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M22 4L12 14.01l-3-3" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'briefcase':
      iconPath = (
        <G>
          <Rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke={safeColor} strokeWidth="2" />
          <Path d="M16 2a2 2 0 0 0-2 2V7H10V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3h16V4a2 2 0 0 0-2-2h-2z" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'calendar':
      iconPath = (
        <G>
          <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={safeColor} strokeWidth="2" />
          <Line x1="16" y1="2" x2="16" y2="6" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
          <Line x1="8" y1="2" x2="8" y2="6" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
          <Line x1="3" y1="10" x2="21" y2="10" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
        </G>
      );
      break;
    case 'file-text':
      iconPath = (
        <G>
          <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M14 2v6h6" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Line x1="16" y1="13" x2="8" y2="13" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
          <Line x1="16" y1="17" x2="8" y2="17" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
          <Line x1="10" y1="9" x2="8" y2="9" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
        </G>
      );
      break;
    case 'dollar-sign':
      iconPath = (
        <G>
          <Line x1="12" y1="1" x2="12" y2="23" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
          <Path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 1 0 1 0 7H6" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'clock':
      iconPath = (
        <G>
          <Circle cx="12" cy="12" r="10" stroke={safeColor} strokeWidth="2" />
          <Path d="M12 6v6l4 2" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'user':
      iconPath = (
        <G>
          <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Circle cx="12" cy="7" r="4" stroke={safeColor} strokeWidth="2" />
        </G>
      );
      break;
    case 'lock':
      iconPath = (
        <G>
          <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke={safeColor} strokeWidth="2" />
          <Path d="M7 11V7a5 5 0 0 1 10 0v4" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'grid':
      iconPath = (
        <G>
          <Rect x="3" y="3" width="7" height="7" rx="1" ry="1" stroke={safeColor} strokeWidth="2" />
          <Rect x="14" y="3" width="7" height="7" rx="1" ry="1" stroke={safeColor} strokeWidth="2" />
          <Rect x="14" y="14" width="7" height="7" rx="1" ry="1" stroke={safeColor} strokeWidth="2" />
          <Rect x="3" y="14" width="7" height="7" rx="1" ry="1" stroke={safeColor} strokeWidth="2" />
        </G>
      );
      break;
    case 'list':
        iconPath = (
            <G>
                <Line x1="8" y1="6" x2="21" y2="6" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="8" y1="12" x2="21" y2="12" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="8" y1="18" x2="21" y2="18" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="3" y1="6" x2="3.01" y2="6" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="3" y1="12" x2="3.01" y2="12" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="3" y1="18" x2="3.01" y2="18" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'user-plus':
        iconPath = (
            <G>
                <Path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Circle cx="8.5" cy="7" r="4" stroke={safeColor} strokeWidth="2" />
                <Line x1="20" y1="8" x2="20" y2="14" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="23" y1="11" x2="17" y2="11" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'upload':
        iconPath = (
            <G>
                <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Polyline points="17 8 12 3 7 8" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Line x1="12" y1="3" x2="12" y2="15" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'download':
        iconPath = (
            <G>
                <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Polyline points="7 10 12 15 17 10" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Line x1="12" y1="15" x2="12" y2="3" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'pie-chart':
        iconPath = (
            <G>
                <Path d="M21.21 15.89A10 10 0 1 1 8 2.83" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M22 12A10 10 0 0 0 12 2v10z" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'clipboard-list':
        iconPath = (
            <G>
                <Rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke={safeColor} strokeWidth="2" />
                <Path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Line x1="12" y1="11" x2="12" y2="17" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="9" y1="14" x2="15" y2="14" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'users-plus':
        iconPath = (
            <G>
                <Path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Circle cx="8.5" cy="7" r="4" stroke={safeColor} strokeWidth="2" />
                <Path d="M20 8v6M23 11h-6" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'file-plus':
        iconPath = (
            <G>
                <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M14 2v6h6" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Line x1="12" y1="18" x2="12" y2="12" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="9" y1="15" x2="15" y2="15" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'bar-chart':
        iconPath = (
            <G>
                <Line x1="12" y1="20" x2="12" y2="10" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="18" y1="20" x2="18" y2="4" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="6" y1="20" x2="6" y2="16" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'refresh-cw':
        iconPath = (
            <G>
                <Path d="M23 4v6h-6" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'calendar-check':
        iconPath = (
            <G>
                <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={safeColor} strokeWidth="2" />
                <Line x1="16" y1="2" x2="16" y2="6" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="8" y1="2" x2="8" y2="6" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="3" y1="10" x2="21" y2="10" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Polyline points="9 16 12 19 19 12" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'clock-history':
        iconPath = (
            <G>
                <Circle cx="12" cy="12" r="10" stroke={safeColor} strokeWidth="2" />
                <Path d="M12 6v6l4 2" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M8 12H2" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M22 12H16" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'credit-card':
        iconPath = (
            <G>
                <Rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke={safeColor} strokeWidth="2" />
                <Line x1="1" y1="10" x2="23" y2="10" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'git-branch':
        iconPath = (
            <G>
                <Line x1="6" y1="3" x2="6" y2="15" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Circle cx="18" cy="6" r="3" stroke={safeColor} strokeWidth="2" />
                <Circle cx="6" cy="18" r="3" stroke={safeColor} strokeWidth="2" />
                <Path d="M18 9a9 9 0 0 1-9 9" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'users-check':
        iconPath = (
            <G>
                <Path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Circle cx="8.5" cy="7" r="4" stroke={safeColor} strokeWidth="2" />
                <Polyline points="17 11 19 13 23 9" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'calendar-alt':
        iconPath = (
            <G>
                <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={safeColor} strokeWidth="2" />
                <Line x1="16" y1="2" x2="16" y2="6" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="8" y1="2" x2="8" y2="6" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="3" y1="10" x2="21" y2="10" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'coins':
        iconPath = (
            <G>
                <Circle cx="8" cy="8" r="6" stroke={safeColor} strokeWidth="2" />
                <Path d="M18.09 10.59a2 2 0 0 1 0 2.82l-1.58 1.58a2 2 0 0 1-2.82 0l-1.58-1.58a2 2 0 0 1 0-2.82l1.58-1.58a2 2 0 0 1 2.82 0z" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M18 13L20 15" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'arrow-up-circle':
        iconPath = (
            <G>
                <Circle cx="12" cy="12" r="10" stroke={safeColor} strokeWidth="2" />
                <Polyline points="16 12 12 8 8 12" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Line x1="12" y1="16" x2="12" y2="8" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'file-invoice':
        iconPath = (
            <G>
                <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M14 2v6h6" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Line x1="16" y1="13" x2="8" y2="13" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="16" y1="17" x2="8" y2="17" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="10" y1="9" x2="8" y2="9" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'upload-cloud':
        iconPath = (
            <G>
                <Polyline points="16 16 12 12 8 16" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Line x1="12" y1="12" x2="12" y2="21" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Path d="M20.39 18.88A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Polyline points="16 16 12 12 8 16" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'eye':
        iconPath = (
            <G>
                <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Circle cx="12" cy="12" r="3" stroke={safeColor} strokeWidth="2" />
            </G>
        );
        break;
    case 'edit':
        iconPath = (
            <G>
                <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'plus':
        iconPath = (
            <G>
                <Line x1="12" y1="5" x2="12" y2="19" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="5" y1="12" x2="19" y2="12" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'more-horizontal':
        iconPath = (
            <G>
                <Circle cx="12" cy="12" r="1" stroke={safeColor} strokeWidth="2" />
                <Circle cx="19" cy="12" r="1" stroke={safeColor} strokeWidth="2" />
                <Circle cx="5" cy="12" r="1" stroke={safeColor} strokeWidth="2" />
            </G>
        );
        break;
    case 'filter':
        iconPath = (
            <G>
                <Path d="M22 3H2l8 12.46V19l4 3v-6.54L22 3z" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'arrow-right':
        iconPath = (
            <G>
                <Line x1="5" y1="12" x2="19" y2="12" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Polyline points="12 5 19 12 12 19" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'folder':
        iconPath = (
            <G>
                <Path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'x':
        iconPath = (
            <G>
                <Line x1="18" y1="6" x2="6" y2="18" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="6" y1="6" x2="18" y2="18" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'alert-triangle':
        iconPath = (
            <G>
                <Path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="12" y1="9" x2="12" y2="13" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="12" y1="17" x2="12.01" y2="17" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'plus-circle':
        iconPath = (
            <G>
                <Circle cx="12" cy="12" r="10" stroke={safeColor} strokeWidth="2" />
                <Line x1="12" y1="8" x2="12" y2="16" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="8" y1="12" x2="16" y2="12" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'building':
        iconPath = (
            <G>
                <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={safeColor} strokeWidth="2" />
                <Path d="M12 2v20" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Path d="M17 10h-2.5a.5.5 0 0 0-.5.5v3h-3v-3a.5.5 0 0 0-.5-.5H7" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'trending-up':
        iconPath = (
            <G>
                <Polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Polyline points="17 6 23 6 23 12" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'star':
        iconPath = (
            <G>
                <Polyline points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'award':
        iconPath = (
            <G>
                <Circle cx="12" cy="8" r="7" stroke={safeColor} strokeWidth="2" />
                <Polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.89" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'code':
        iconPath = (
            <G>
                <Polyline points="16 18 22 12 16 6" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Polyline points="8 6 2 12 8 18" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'phone':
        iconPath = (
            <G>
                <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-1.11 2.45L4.5 11.2A19.9 19.9 0 0 0 12.8 19.5l.66-.66a2 2 0 0 1 2.45-1.11 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'map-pin':
        iconPath = (
            <G>
                <Path d="M12 12L12 22" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M12 2C16.4183 2 20 5.58172 20 10C20 17 12 22 12 22C12 22 4 17 4 10C4 5.58172 7.58172 2 12 2Z" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Circle cx="12" cy="10" r="3" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'camera':
        iconPath = (
            <G>
                <Path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Circle cx="12" cy="13" r="4" stroke={safeColor} strokeWidth="2" />
            </G>
        );
        break;
    case 'calendar-x':
        iconPath = (
            <G>
                <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={safeColor} strokeWidth="2" />
                <Line x1="16" y1="2" x2="16" y2="6" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="8" y1="2" x2="8" y2="6" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="3" y1="10" x2="21" y2="10" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="10" y1="14" x2="14" y2="18" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Line x1="14" y1="14" x2="10" y2="18" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'database':
        iconPath = (
            <G>
                <Ellipse cx="12" cy="5" rx="9" ry="3" stroke={safeColor} strokeWidth="2" />
                <Path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
                <Path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke={safeColor} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'paperclip':
        iconPath = (
            <G>
                <Path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49L16.81 2.18a4.99 4.99 0 0 1 7.07 7.07l-9.19 9.19a4 4 0 0 1-5.66-5.66L19.5 7.3" stroke={safeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    default:
      console.warn(`Unknown icon: ${name}. Rendering fallback circle.`);
      iconPath = <Circle cx="12" cy="12" r="10" fill="transparent" stroke={safeColor} strokeWidth="2" />;
      break;
  }

  // If color is an Animated.Value, wrap Svg in Animated.
  if (color instanceof Animated.Value) {
    return (
      <Animated.View style={style}>
        <Svg width={size} height={size} viewBox="0 0 24 24">
          {iconPath}
        </Svg>
      </Animated.View>
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      {iconPath}
    </Svg>
  );
};

// --- StatsCard Component ---
interface StatsCardProps {
  value: string | number;
  label: string;
  icon: string;
  iconColor: string;
  iconBgColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ value, label, icon, iconColor, iconBgColor }) => {
  const { colors } = useTheme(); // Use theme colors
  const borderColorAnim = useRef(new Animated.Value(0)).current;
  const shadowOpacityAnim = useRef(new Animated.Value(0)).current;
  const shadowRadiusAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(borderColorAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(shadowOpacityAnim, {
        toValue: 0.3, // Increased opacity for glow effect
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(shadowRadiusAnim, {
        toValue: widthPixel(8), // Increased radius for glow effect
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(borderColorAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(shadowOpacityAnim, {
        toValue: 0.1, // Revert to original opacity
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(shadowRadiusAnim, {
        toValue: widthPixel(4), // Revert to original radius
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const animatedBorderColor = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.borderGray, colors.glowBlue], // Glow blue on press
  });

  return (
    <TouchableOpacity
      activeOpacity={1} // Keep full opacity during press for custom animation
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{
        width: '48%',
        marginBottom: heightPixel(8),
      }}
    >
      <Animated.View
        style={[
          statsCardStyles(colors).cardContainer, // Pass colors to styles
          {
            borderColor: animatedBorderColor,
            shadowOpacity: shadowOpacityAnim,
            shadowRadius: shadowRadiusAnim,
            shadowColor: colors.glowBlue, // Glow color for shadow
          },
        ]}
      >
        <View>
          <Text style={statsCardStyles(colors).valueText}>{value}</Text>
          <Text style={statsCardStyles(colors).labelText}>{label}</Text>
        </View>
        <View style={[statsCardStyles(colors).iconBackground, { backgroundColor: iconBgColor }]}>
          <CustomSvgIcon name={icon} color={iconColor} size={widthPixel(28)} />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Modified StyleSheet to accept colors
const statsCardStyles = (colors: any) => StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.cardBackground, // Dynamic background
    borderRadius: widthPixel(12),
    padding: widthPixel(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1, // Add border for the glow effect
    shadowOffset: { width: 0, height: heightPixel(2) },
    elevation: 3,
  },
  valueText: {
    fontSize: fontPixel(24),
    fontWeight: 'bold',
    color: colors.textColor, // Dynamic text color
    fontFamily: 'System',
  },
  labelText: {
    fontSize: fontPixel(11),
    color: colors.secondaryText, // Dynamic text color
    marginTop: heightPixel(4),
    fontFamily: 'System',
  },
  iconBackground: {
    width: widthPixel(50),
    height: widthPixel(50),
    borderRadius: widthPixel(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// --- SectionCard Component ---
interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  style?: object;
  viewAllLink?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, children, style, viewAllLink }) => {
  const { colors } = useTheme(); // Use theme colors
  const borderColorAnim = useRef(new Animated.Value(0)).current;
  const shadowOpacityAnim = useRef(new Animated.Value(0)).current;
  const shadowRadiusAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(borderColorAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(shadowOpacityAnim, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(shadowRadiusAnim, {
        toValue: widthPixel(8),
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(borderColorAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(shadowOpacityAnim, {
        toValue: 0.1,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(shadowRadiusAnim, {
        toValue: widthPixel(4),
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const animatedBorderColor = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.borderGray, colors.glowBlue],
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        {
          width: '48%',
          marginBottom: heightPixel(16),
        },
        style, // Apply external styles last
      ]}
    >
      <Animated.View
        style={[
          sectionCardStyles(colors).cardContainer, // Pass colors to styles
          {
            borderColor: animatedBorderColor,
            shadowOpacity: shadowOpacityAnim,
            shadowRadius: shadowRadiusAnim,
            shadowColor: colors.glowBlue,
          },
        ]}
      >
        <View style={sectionCardStyles(colors).titleRow}>
          <Text style={sectionCardStyles(colors).titleText}>{title}</Text>
          {viewAllLink && (
            <TouchableOpacity style={sectionCardStyles(colors).viewAllButton}>
              <Text style={sectionCardStyles(colors).viewAllText}>View All</Text>
              <CustomSvgIcon name="arrow-right" color={colors.blue} size={fontPixel(14)} style={sectionCardStyles(colors).viewAllIcon} />
            </TouchableOpacity>
          )}
        </View>
        <View style={sectionCardStyles(colors).contentContainer}>
          {children}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Modified StyleSheet to accept colors
const sectionCardStyles = (colors: any) => StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.cardBackground, // Dynamic background
    borderRadius: widthPixel(12),
    padding: widthPixel(16),
    borderWidth: 1, // Add border for the glow effect
    shadowOffset: { width: 0, height: heightPixel(2) },
    elevation: 3,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightPixel(12),
  },
  titleText: {
    fontSize: fontPixel(16),
    fontWeight: '600',
    color: colors.textColor, // Dynamic text color
    fontFamily: 'System',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: heightPixel(4),
    paddingHorizontal: widthPixel(8),
    borderRadius: widthPixel(4),
  },
  viewAllText: {
    fontSize: fontPixel(12),
    fontWeight: '600',
    color: colors.blue,
    marginRight: widthPixel(4),
    fontFamily: 'System',
  },
  viewAllIcon: {
    marginTop: heightPixel(2),
  },
  contentContainer: {
    flex: 1,
  },
});

// --- QuickActionButton Component ---
interface QuickActionButtonProps {
  iconName: string;
  label: string;
  color: string;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ iconName, label, color }) => {
  const { colors } = useTheme(); // Use theme colors
  return (
    <TouchableOpacity style={quickActionButtonStyles(colors).buttonContainer}>
      <View style={[quickActionButtonStyles(colors).iconBackground, { backgroundColor: color + '1A' }]}>
        <CustomSvgIcon name={iconName} color={color} size={widthPixel(28)} />
      </View>
      <Text style={quickActionButtonStyles(colors).labelText}>{label}</Text>
    </TouchableOpacity>
  );
};

// Modified StyleSheet to accept colors
const quickActionButtonStyles = (colors: any) => StyleSheet.create({
  buttonContainer: {
    width: '48%',
    height: widthPixel(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cardBackground, // Dynamic background
    borderRadius: widthPixel(12),
    borderWidth: 1,
    borderColor: colors.borderGray, // Dynamic border color
    padding: widthPixel(8),
    marginBottom: heightPixel(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: heightPixel(1) },
    shadowOpacity: 0.05,
    shadowRadius: widthPixel(2),
    elevation: 1,
  },
  iconBackground: {
    width: widthPixel(50),
    height: widthPixel(50),
    borderRadius: widthPixel(25),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: heightPixel(6),
  },
  labelText: {
    fontSize: fontPixel(12),
    fontWeight: '500',
    color: colors.textColor, // Dynamic text color
    textAlign: 'center',
    fontFamily: 'System',
  },
});

// --- Main DashboardScreen Component ---
const quickActions = [
  { iconName: 'user-plus', label: 'Add Employee', color: '#007BFF' }, // Use hex for direct color, not colors.blue
  { iconName: 'file-text', label: 'Attendance Report', color: '#007BFF' },
  { iconName: 'check-circle', label: '#FFC107' },
  { iconName: 'dollar-sign', label: 'Payroll', color: '#198754' },
  { iconName: 'clock', label: 'My Attendance', color: '#6C757D' },
  { iconName: 'file-plus', label: 'Apply Leave', color: '#DC3545' },
];

const DashboardScreen: React.FC = () => {
  const { isDarkMode, toggleTheme, colors } = useTheme(); // Consume theme context

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = today.toLocaleDateString('en-US', options);

  // Sun/Moon icon animation
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const [currentIcon, setCurrentIcon] = useState(isDarkMode ? 'moon' : 'sun');
  const [iconColor, setIconColor] = useState(isDarkMode ? colors.white : colors.white); // Initial color based on mode

  useEffect(() => {
    // Update icon and color when isDarkMode changes
    setCurrentIcon(isDarkMode ? 'moon' : 'sun');
    setIconColor(isDarkMode ? colors.white : colors.white); // Keep white for both initial icons
  }, [isDarkMode, colors]);

  const handleIconPress = () => {
    // Start rotation animation
    Animated.timing(rotationAnim, {
      toValue: 1, // Represents 360 degrees
      duration: 300, // Quick rotation
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      // After rotation, reset value for next rotation and toggle theme
      rotationAnim.setValue(0);
      toggleTheme();
    });
  };

  const rotateInterpolate = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Single 360-degree rotation
  });

  const animatedIconStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  return (
    <ScrollView contentContainerStyle={[styles(colors).scrollContent, { backgroundColor: colors.background }]}>
      {/* Welcome Banner */}
      <View style={[styles(colors).welcomeBanner, { backgroundColor: colors.welcomeBannerBg }]}>
        <View style={styles(colors).welcomeTextContainer}>
          <Text style={[styles(colors).welcomeTitle, { color: colors.welcomeBannerText }]}>Welcome back, Advika Singh!</Text>
          <Text style={[styles(colors).welcomeSubtitle, { color: colors.welcomeBannerText }]}>{formattedDate} • Manage your team efficiently</Text>
        </View>
        {/* Animated Sun/Moon Icon as a switch */}
        <TouchableOpacity onPress={handleIconPress}>
          <Animated.View style={animatedIconStyle}>
            <CustomSvgIcon name={currentIcon} color={iconColor} size={widthPixel(36)} />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles(colors).statsSection}>
        <StatsCard value="51" label="Total Employees" icon="users" iconColor={colors.blue} iconBgColor={colors.infoBlueBg} />
        <StatsCard value="0" label="Present Today" icon="check-circle" iconColor={colors.green} iconBgColor={colors.successGreenBg} />
        <StatsCard value="6" label="Departments" icon="briefcase" iconColor={colors.gradientPurpleEnd} iconBgColor={colors.gradientPurpleEnd + '1A'} />
        <StatsCard value="8" label="Pending Leaves" icon="calendar" iconColor={colors.red} iconBgColor={colors.dangerRedBg} />
      </View>

      {/* Content Cards Container (Quick Actions & Recent Activities) */}
      <View style={styles(colors).contentCardsContainer}>
        {/* QUICK ACTIONS SECTION (Now first and on the left) */}
        <SectionCard title="Quick Actions" style={styles(colors).sectionCard}>
          <View style={styles(colors).quickActionsGrid}>
            {quickActions.map((action) => (
              <QuickActionButton
                key={action.label}
                iconName={action.iconName}
                label={action.label}
                color={action.color}
              />
            ))}
          </View>
        </SectionCard>

        {/* RECENT ACTIVITIES SECTION (Now second and on the right) */}
        <SectionCard title="Recent Activities" style={styles(colors).sectionCard}>
          <View style={styles(colors).noActivitiesContainer}>
            <CustomSvgIcon name="file-text" color={colors.secondaryText} size={widthPixel(40)} />
            <Text style={[styles(colors).noActivitiesText, { color: colors.secondaryText }]}>No recent activities</Text>
          </View>
        </SectionCard>
      </View>

      {/* Monthly Attendance Overview Card */}
      <SectionCard title="Monthly Attendance Overview" style={styles(colors).attendanceOverviewCard}>
        <View style={styles(colors).attendanceStats}>
          <View style={styles(colors).attendanceStatItem}>
            <Text style={[styles(colors).attendanceValue, { color: colors.green }]}>0.0%</Text>
            <Text style={[styles(colors).attendanceLabel, { color: colors.secondaryText }]}>Attendance Rate</Text>
          </View>
          <View style={styles(colors).attendanceStatItem}>
            <Text style={[styles(colors).attendanceValue, { color: colors.lightBlue }]}>0</Text>
            <Text style={[styles(colors).attendanceLabel, { color: colors.secondaryText }]}>Present Days</Text>
          </View>
          <View style={styles(colors).attendanceStatItem}>
            <Text style={[styles(colors).attendanceValue, { color: colors.yellow }]}>0</Text>
            <Text style={[styles(colors).attendanceLabel, { color: colors.secondaryText }]}>Late Arrivals</Text>
          </View>
          <View style={styles(colors).attendanceStatItem}>
            <Text style={[styles(colors).attendanceValue, { color: colors.red }]}>0</Text>
            <Text style={[styles(colors).attendanceLabel, { color: colors.secondaryText }]}>Absent Days</Text>
          </View>
        </View>
      </SectionCard>
    </ScrollView>
  );
};

// Modified StyleSheet to accept colors
const styles = (colors: any) => StyleSheet.create({
  scrollContent: {
    paddingHorizontal: widthPixel(16),
    paddingBottom: heightPixel(32),
  },
  welcomeBanner: {
    paddingVertical: heightPixel(24),
    paddingHorizontal: widthPixel(20),
    borderRadius: widthPixel(8),
    marginVertical: heightPixel(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: heightPixel(4) },
    shadowOpacity: 0.2,
    shadowRadius: widthPixel(6),
    elevation: 5,
  },
  welcomeTextContainer: {
    flex: 1,
    paddingRight: widthPixel(16),
  },
  welcomeTitle: {
    fontSize: fontPixel(20),
    fontWeight: '700',
    fontFamily: 'System',
  },
  welcomeSubtitle: {
    fontSize: fontPixel(13),
    fontWeight: '400',
    fontFamily: 'System',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: heightPixel(20),
    marginHorizontal: widthPixel(-4),
  },
  contentCardsContainer: {
    flexDirection: 'row',
    marginTop: heightPixel(16),
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  sectionCard: {
    // This style is now applied via SectionCard's internal style prop
    // The specific width and margin are handled by the TouchableOpacity wrapper in the component
  },
  noActivitiesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: heightPixel(80),
  },
  noActivitiesText: {
    marginTop: heightPixel(8),
    fontSize: fontPixel(13),
    textAlign: 'center',
    fontFamily: 'System',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: heightPixel(8),
  },
  attendanceOverviewCard: {
    marginTop: 0,
    marginBottom: heightPixel(16),
  },
  attendanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: heightPixel(16),
    flexWrap: 'wrap',
  },
  attendanceStatItem: {
    alignItems: 'center',
    marginVertical: heightPixel(8),
    width: '45%',
  },
  attendanceValue: {
    fontSize: fontPixel(18),
    fontWeight: '600',
    fontFamily: 'System',
  },
  attendanceLabel: {
    fontSize: fontPixel(11),
    fontWeight: '400',
    fontFamily: 'System',
    textAlign: 'center',
  },
});

export default DashboardScreen;
