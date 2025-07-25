import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  UIManager,
  Animated,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomSvgIcon from '../screens/CustomIcon';
import { useTheme } from '../context/ThemeContext';
import { widthPixel, heightPixel, fontPixel } from '../utils/responsive';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface HeaderProps {
  onMenuPress: () => void;
  title: string;
  showUserName?: boolean;
  navigation?: any;
}

const Header: React.FC<HeaderProps> = ({
  onMenuPress,
  title,
  showUserName = false,
  navigation,
}) => {
  const { colors } = useTheme();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const rippleAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    startRipple();
  };

  const startRipple = () => {
    rippleAnim.setValue(0);
    Animated.timing(rippleAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const rippleScale = rippleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1],
  });

  const rippleOpacity = rippleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.25, 0],
  });

  return (
    <Animated.View
      style={{
        transform: [{ translateY: slideAnim }],
        opacity: fadeAnim,
      }}
    >
      <LinearGradient
        colors={['blue', '#b5179e', '#7209b7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerContainer}
      >
        <TouchableOpacity style={styles.iconButton} onPress={onMenuPress}>
          <CustomSvgIcon name="menu" color="#fff" size={widthPixel(28)} />
        </TouchableOpacity>

        {!isSearchVisible && (
          <>
            <TouchableOpacity style={styles.iconButton} onPress={toggleSearch}>
              <CustomSvgIcon name="search" color="#fff" size={widthPixel(24)} />
            </TouchableOpacity>

            <Text style={styles.headerTitle} numberOfLines={1}>
              {title}
            </Text>

            <View style={styles.userProfileContainer}>
              <TouchableOpacity style={styles.iconButton}>
                <CustomSvgIcon name="bell" color="#fff" size={widthPixel(26)} />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.profileDetails}
                onPress={() => navigation?.navigate('My Profile')}
                activeOpacity={0.7}
              >
                <View style={styles.avatarShadow}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>AS</Text>
                  </View>
                </View>
                {showUserName && (
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>Advika Singh</Text>
                    <Text style={styles.userRole}>HR Admin</Text>
                  </View>
                )}
                <CustomSvgIcon
                  name="chevron-down"
                  color="#fff"
                  size={widthPixel(14)}
                />
              </TouchableOpacity>
            </View>
          </>
        )}

        {isSearchVisible && (
          <Animated.View
            style={[
              styles.searchBarContainer,
              {
                transform: [{ scale: rippleScale }],
              },
            ]}
          >
            <Animated.View
              style={[
                styles.rippleEffect,
                {
                  opacity: rippleOpacity,
                },
              ]}
            />
            <CustomSvgIcon
              name="search"
              color="#999"
              size={widthPixel(20)}
              style={styles.searchIcon}
            />
            <TextInput
              autoFocus
              placeholder="Type to search..."
              placeholderTextColor="#999"
              style={styles.searchInput}
              onBlur={toggleSearch}
            />
          </Animated.View>
        )}
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthPixel(5),
    paddingVertical: heightPixel(3),

    borderBottomLeftRadius: widthPixel(25),
    borderBottomRightRadius: widthPixel(25),
    borderTopLeftRadius: widthPixel(25),
    borderTopRightRadius: widthPixel(25),
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    minHeight: heightPixel(30),
    width: '100%',
  },
  iconButton: {
    padding: widthPixel(8),
  },
  headerTitle: {
    fontSize: fontPixel(20),
    fontWeight: 'bold',
    marginLeft: widthPixel(10),
    flexShrink: 1,
    color: '#fff',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: widthPixel(30),
    paddingHorizontal: widthPixel(12),
    height: heightPixel(45),
    flex: 1,
    marginLeft: widthPixel(12),
    elevation: 6,
    overflow: 'hidden',
  },
  rippleEffect: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#f72585',
    borderRadius: widthPixel(30),
  },
  searchIcon: {
    marginRight: widthPixel(8),
  },
  searchInput: {
    flex: 1,
    fontSize: fontPixel(16),
    color: '#333',
  },
  userProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: widthPixel(6),
  },
  avatarShadow: {
    shadowColor: '#fff',
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
    borderRadius: widthPixel(16),
  },
  avatar: {
    width: widthPixel(35),
    height: widthPixel(35),
    borderRadius: widthPixel(18),
    backgroundColor: '#4cc9f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: fontPixel(18),
    fontWeight: 'bold',
  },
  userInfo: {
    marginHorizontal: widthPixel(8),
  },
  userName: {
    color: '#fff',
    fontSize: fontPixel(14),
    fontWeight: '600',
  },
  userRole: {
    color: '#ddd',
    fontSize: fontPixel(12),
  },
});

export default Header;
