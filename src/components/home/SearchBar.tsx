import { View, Text, SafeAreaView, TouchableOpacity, Pressable, Animated, Image } from 'react-native'
import React from 'react'
import { useStyles } from 'react-native-unistyles';
import { homeStyles } from '@unistyles/homeStyles';
import { useAppDispatch, useAppSelector } from '@states/reduxHook';
import { useSharedState } from '@features/tabs/SharedContext';
import { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Icon from '@components/global/Icon';
import { Colors } from '@unistyles/Constants';
import RollingContent from 'react-native-rolling-bar'
import CustomText from '@components/global/CustomText';
import { setVegMode } from '@states/reducers/userSlice';

const SearchBar = () => {
    const dispatch = useAppDispatch();
    const { styles } = useStyles(homeStyles);
    const isVegMode = useAppSelector(state => state.user.isVegMode)
    const { scrollYGlobal } = useSharedState();

    const textColorAnimation = useAnimatedStyle(() => {
        const textColor = interpolate(scrollYGlobal.value, [0, 80], [1, 0])
        return { color: `rgb(${textColor},${textColor},${textColor})` }
    })

    const serchItems = [
        'Search "Pani puri"',
        'Search "Chaat shops"',
        'Search "Cheez Pizza"',
        'Search "Trending cuisines"'
    ];


    return (
        <>
            <SafeAreaView />

            <View style={[styles.flexRowBetween, styles.padding]}>
                <TouchableOpacity activeOpacity={0.8} style={styles.searchInputContainer}>
                    <Icon iconFamily='Ionicons' name='search' color={isVegMode ? Colors.active : Colors.primary} size={20} />
                    <RollingContent interval={3000} defaultStyle={false} customStyle={styles.textContainer}>
                        {serchItems?.map((item, index) => {
                            return (
                                <CustomText key={index} fontFamily='Okra-Medium' fontSize={12} style={styles.rollingText}>
                                    {item}
                                </CustomText>
                            )
                        })}
                    </RollingContent>
                    <Icon iconFamily='Ionicons' name='mic-outline' color={isVegMode ? Colors.active : Colors.primary} size={20} />

                </TouchableOpacity>

                <Pressable style={styles.vegMode} onPress={() => dispatch(setVegMode(!isVegMode))} >
                    <Animated.Text style={[textColorAnimation, styles.animatedText]}>
                        VEG
                    </Animated.Text>
                    <Animated.Text style={[textColorAnimation, styles.animatedSubText]}>
                        MODE
                    </Animated.Text>

                    <Image
                        style={styles.switch}
                        source={isVegMode ? require('@assets/icons/switch_on.png') : require('@assets/icons/switch_off.png')}
                    />
                </Pressable>

            </View>
        </>
    )
}

export default SearchBar