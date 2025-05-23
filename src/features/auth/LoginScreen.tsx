import { View, StatusBar, Platform, Image, TouchableOpacity, ActivityIndicator, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { loginStyles } from '@unistyles/authStyles'
import { useStyles } from 'react-native-unistyles'
import CustomText from '@components/global/CustomText'
import BreakerText from '@components/ui/BreakerText'
import PhoneInput from '@components/ui/PhoneInput'
import SocialLogin from '@components/ui/SocialLogin'
import { resetAndNavigate } from '@utils/NavigationUtils'
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight'

const LoginScreen = () => {
  const { styles } = useStyles(loginStyles)
  const animatedValue = useRef(new Animated.Value(0)).current
  const keaboardOffsetHeight = useKeyboardOffsetHeight();
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (keaboardOffsetHeight === 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(animatedValue, {
        toValue: -keaboardOffsetHeight * 0.25,
        duration: 500,
        useNativeDriver: true,
      }).start()
    }
  }, [keaboardOffsetHeight])

  const handleLogin = async () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      resetAndNavigate('UserBottomTab')
    }, 2000)
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={Platform.OS !== 'android'} />

      <Image source={require('@assets/images/login.png')} style={styles.cover} />

      <Animated.ScrollView
        bounces={false}
        keyboardShouldPersistTaps='handled'
        keyboardDismissMode='on-drag'
        style={{ transform: [{ translateY: animatedValue }] }}
        contentContainerStyle={styles.bottomContainer}
      >
        <CustomText
          variant='h2'
          style={styles.title}
          fontFamily='Okra-Bold'
        >
          India's #1 food delivery and dining app
        </CustomText>

        <BreakerText text='log in or sign up' />

        <PhoneInput
          onFocus={() => { }}
          onBlur={() => { }}
          value={phone}
          onChangeText={setPhone}
        />

        <TouchableOpacity style={styles.buttonContainer} disabled={loading} onPress={handleLogin} activeOpacity={0.8}>
          {loading ?
            <ActivityIndicator size={'small'} color={'#fff'} />
            :
            <CustomText color='#fff' variant='h5' fontFamily='Okra-Medium'>
              Continue
            </CustomText>
          }
        </TouchableOpacity>

        <BreakerText text='or' />

        <SocialLogin />

      </Animated.ScrollView>

      <View style={styles.footer}>
        <CustomText>By continuing you agree to our</CustomText>
        <View style={styles.footerTextContainer}>
          <CustomText style={styles.footerText}>Tearms of Service</CustomText>
          <CustomText style={styles.footerText}>Privacy policy</CustomText>
          <CustomText style={styles.footerText}>Content policy</CustomText>
        </View>
      </View>

    </View>
  )
}

export default LoginScreen