import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function LiquidBackground() {
  const blob1 = useRef(new Animated.Value(0)).current;
  const blob2 = useRef(new Animated.Value(0)).current;
  const blob3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = (value, duration) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animate(blob1, 8000);
    animate(blob2, 10000);
    animate(blob3, 12000);
  }, []);

  const blob1Transform = blob1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  const blob2Transform = blob2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -80],
  });

  const blob3Transform = blob3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0a0e1a', '#1a1f3a', '#0a0e1a']}
        style={styles.gradient}
      />
      
      <Animated.View
        style={[
          styles.blob,
          styles.blob1,
          {
            transform: [
              { translateX: blob1Transform },
              { translateY: blob1Transform },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={['#17477b40', '#a5d0e920']}
          style={styles.blobGradient}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.blob,
          styles.blob2,
          {
            transform: [
              { translateX: blob2Transform },
              { translateY: blob2Transform },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={['#a5d0e930', '#17477b30']}
          style={styles.blobGradient}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.blob,
          styles.blob3,
          {
            transform: [
              { translateX: blob3Transform },
              { translateY: blob3Transform },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={['#17477b30', '#a5d0e940']}
          style={styles.blobGradient}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  blob: {
    position: 'absolute',
    borderRadius: 9999,
  },
  blob1: {
    width: width * 0.8,
    height: width * 0.8,
    top: -width * 0.4,
    left: -width * 0.2,
  },
  blob2: {
    width: width * 0.7,
    height: width * 0.7,
    bottom: -width * 0.3,
    right: -width * 0.2,
  },
  blob3: {
    width: width * 0.6,
    height: width * 0.6,
    top: height * 0.3,
    right: -width * 0.3,
  },
  blobGradient: {
    flex: 1,
    borderRadius: 9999,
  },
});
