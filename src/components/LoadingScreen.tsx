import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface LoadingScreenProps {
  onAnimationFinish?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onAnimationFinish }) => {
  // Simple bouncing ball animation
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Text animations
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Create bouncing animation
    const createBounceAnimation = () => {
      return Animated.loop(
        Animated.sequence([
          // Ball bounces up
          Animated.parallel([
            Animated.timing(bounceAnim, {
              toValue: -50,
              duration: 600,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1.2,
              duration: 300,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
          ]),
          // Ball falls down
          Animated.parallel([
            Animated.timing(bounceAnim, {
              toValue: 0,
              duration: 600,
              easing: Easing.in(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 300,
              easing: Easing.in(Easing.quad),
              useNativeDriver: true,
            }),
          ]),
          // Brief pause
          Animated.delay(200),
        ]),
      );
    };

    // Create rotation animation
    const createRotationAnimation = () => {
      return Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );
    };

    // Create text animation
    const createTextAnimation = () => {
      return Animated.sequence([
        Animated.delay(500),
        Animated.parallel([
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 800,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(textScale, {
            toValue: 1,
            duration: 800,
            easing: Easing.out(Easing.back(1.2)),
            useNativeDriver: true,
          }),
        ]),
      ]);
    };

    // Start animations
    const bounceAnimation = createBounceAnimation();
    const rotationAnimation = createRotationAnimation();
    const textAnimation = createTextAnimation();

    bounceAnimation.start();
    rotationAnimation.start();
    textAnimation.start();

    // Auto-finish after 3 seconds if callback provided
    let timer: NodeJS.Timeout;
    if (onAnimationFinish) {
      timer = setTimeout(() => {
        onAnimationFinish();
      }, 3000);
    }

    return () => {
      bounceAnimation.stop();
      rotationAnimation.stop();
      textAnimation.stop();
      if (timer) clearTimeout(timer);
    };
  }, [
    bounceAnim,
    scaleAnim,
    rotateAnim,
    textOpacity,
    textScale,
    onAnimationFinish,
  ]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />

      <View style={styles.content}>
        {/* Animated Ball */}
        <Animated.View
          style={[
            styles.ball,
            {
              transform: [
                { translateY: bounceAnim },
                { scale: scaleAnim },
                { rotate: spin },
              ],
            },
          ]}
        />

        {/* Loading Dots */}
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.dot1]} />
          <View style={[styles.dot, styles.dot2]} />
          <View style={[styles.dot, styles.dot3]} />
        </View>

        {/* Welcome Text */}
        <Animated.Text
          style={[
            styles.welcomeText,
            {
              opacity: textOpacity,
              transform: [{ scale: textScale }],
            },
          ]}
        >
          We Welcome You
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ball: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A90E2',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4A90E2',
    marginHorizontal: 4,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A90E2',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

export default LoadingScreen;
