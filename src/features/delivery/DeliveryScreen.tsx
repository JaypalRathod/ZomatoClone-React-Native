import { View, Platform, StatusBar } from 'react-native'
import React, { FC } from 'react'
import { useStyles } from 'react-native-unistyles'
import { homeStyles } from '@unistyles/homeStyles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { useSharedState } from '@features/tabs/SharedContext'
import Graphics from '@components/home/Graphics'
import HeaderSection from '@components/home/HeaderSection'
import MainList from '@components/List/MainList'

const DeliveryScreen: FC = () => {
  const { styles } = useStyles(homeStyles);
  const insets = useSafeAreaInsets();
  const { scrollYGlobal, scrollY } = useSharedState();

  const backgroundColorChanges = useAnimatedStyle(() => {
    const opacity = interpolate(scrollYGlobal.value, [1, 50], [0, 1])
    return {
      backgroundColor: `rgba(255,255,255,${opacity})`
    }
  })

  const moveUpStyles = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollYGlobal.value,
      [0, 50],
      [0, -50],
      Extrapolate.CLAMP
    )
    return {
      transform: [{ translateY: translateY }]
    }
  })

  const moveUpStylesNotExtrapolate = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollYGlobal.value,
      [0, 50],
      [0, -50],
    )
    return {
      transform: [{ translateY: translateY }]
    }
  })

  return (
    <View style={styles.container}>
      <View style={{ height: Platform.OS === 'android' ? insets.top : 0 }} />
      <StatusBar backgroundColor={'#CC152D'} />

      <Animated.View style={[moveUpStyles]}>

        <Animated.View style={[moveUpStylesNotExtrapolate]}>
          <Graphics />
        </Animated.View>

        <Animated.View style={[backgroundColorChanges, styles.topHeader]}>
          <HeaderSection />
        </Animated.View>

      </Animated.View>

      <Animated.View style={[moveUpStyles]}>
        <MainList />
      </Animated.View>

    </View>
  )
}

export default DeliveryScreen