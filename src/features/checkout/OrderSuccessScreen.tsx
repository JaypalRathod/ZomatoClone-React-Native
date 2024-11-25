import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useEffect } from 'react'
import { replace } from '@utils/NavigationUtils';
import SoundPlayer from 'react-native-sound-player'
import { Colors, screenWidth } from '@unistyles/Constants';
import LottieView from 'lottie-react-native';
import CustomText from '@components/global/CustomText';
import { useRoute } from '@react-navigation/native';
import { useAppDispatch } from '@states/reduxHook';
import { clearRestaurantCart } from '@states/reducers/cartSlice';

const OrderSuccessScreen: FC = () => {

    const route = useRoute() as any;
    const restaurant = route?.params?.restaurant
    const dispatch = useAppDispatch()


    useEffect(() => {
        try {
            SoundPlayer.playAsset(require('@assets/sfx/confirm_sound.mp3'))
        } catch (error) {
            console.log(`Cannot play the sound file`, error)
        }

        const timeoutId = setTimeout(() => {
            replace('UserBottomTab');
            dispatch(clearRestaurantCart({ restaurant_id: restaurant?.id }))
        }, 2300);

        return () => clearTimeout(timeoutId);
    }, [])

    return (
        <View style={styles.container}>
            <LottieView
                source={require('@assets/animations/confirm.json')}
                autoPlay={true}
                duration={2000}
                loop={false}
                speed={1}
                style={styles.lottieView}
                enableMergePathsAndroidForKitKatAndAbove={true}
                hardwareAccelerationAndroid
            />
            <CustomText fontSize={12} fontFamily='Okra-Bold' style={styles.orderPlacedText}>
                ORDER PLACED
            </CustomText>
            <View style={styles.deliveryContainer}>
                <CustomText variant='h4' fontFamily='Okra-Bold' style={styles.deliveryText}>
                    Delivering to Home
                </CustomText>
            </View>
            <CustomText fontSize={12} style={styles.addressText}>
                Rajkot, Gujrat ({restaurant?.name})
            </CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    lottieView: {
        width: screenWidth * 0.6,
        height: 150,
    },
    orderPlacedText: {
        opacity: 0.4,
    },
    deliveryContainer: {
        borderBottomWidth: 2,
        paddingBottom: 4,
        marginBottom: 5,
        borderColor: Colors.active,
    },
    deliveryText: {
        marginTop: 15,
        borderColor: Colors.active,
    },
    addressText: {
        opacity: 0.8
    }
})

export default OrderSuccessScreen