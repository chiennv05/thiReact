import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Animated, Dimensions } from 'react-native';

const Banner = () => {
  const bannerImages = [
    require('../assets/images/banner.png'),
    require('../assets/images/banner2.png'),
    require('../assets/images/banner3.png'),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState(0); // 0: fade+slide, 1: zoom, 2: rotate
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const runAnimation = () => {
    switch (currentAnimation) {
      case 0: // Fade + Slide
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: -50,
            duration: 1000,
            useNativeDriver: true,
          })
        ]).start(() => {
          updateImage();
          translateX.setValue(50);
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(translateX, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            })
          ]).start();
        });
        break;

      case 1: // Zoom
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          })
        ]).start(() => {
          updateImage();
          scale.setValue(0.8);
          fadeAnim.setValue(1);
          Animated.timing(scale, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }).start();
        });
        break;

      case 2: // Rotate
        Animated.parallel([
          Animated.timing(rotate, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          })
        ]).start(() => {
          updateImage();
          rotate.setValue(0);
          fadeAnim.setValue(1);
        });
        break;
    }
  };

  const updateImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    setCurrentAnimation((prevAnim) => (prevAnim + 1) % 3);
  };

  useEffect(() => {
    const interval = setInterval(runAnimation, 3000);
    return () => clearInterval(interval);
  }, [currentAnimation]);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.bannerContainer}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            opacity: fadeAnim,
            transform: [
              { translateX },
              { scale },
              { rotate: spin }
            ]
          }
        ]}
      >
        <Image
          source={bannerImages[currentIndex]}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </Animated.View>
      <View style={styles.dotsContainer}>
        {bannerImages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentIndex ? '#2196f3' : '#ccc' }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default Banner; 