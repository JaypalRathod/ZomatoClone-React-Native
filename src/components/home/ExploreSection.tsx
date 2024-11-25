import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { homeStyles } from '@unistyles/homeStyles';
import { useStyles } from 'react-native-unistyles';
import CustomText from '@components/global/CustomText';
import { Colors } from '@unistyles/Constants';
import Icon from '@components/global/Icon';
import RecommndedList from './RecommndedList';
import BreakerText from '@components/ui/BreakerText';
import RegularFoodList from '@components/List/RegularFoodList';

const ExploreSection = () => {
    const [selectedTab, setSelectedTab] = useState(1)
    const { styles } = useStyles(homeStyles);


    return (
        <View style={styles.topHidingContainer}>
            <View style={styles.flexRowCenter} >
                <Pressable style={styles.leftTab(selectedTab == 1)} onPress={() => setSelectedTab(1)}>
                    <CustomText color={selectedTab == 1 ? Colors.text : Colors.lightText} fontFamily='Okra-Medium'>
                        Recommended
                    </CustomText>
                </Pressable>

                <Pressable style={styles.rightTab(selectedTab == 2)} onPress={() => setSelectedTab(2)}>
                    <Icon name='bookmark-outline' iconFamily='Ionicons' color={selectedTab == 2 ? Colors.text : Colors.lightText} size={14} />
                    <CustomText color={selectedTab == 2 ? Colors.text : Colors.lightText} fontFamily='Okra-Medium'>
                        Collection
                    </CustomText>
                </Pressable>
            </View>

            <RecommndedList />
            <BreakerText text="WHAT'S ON YOUR MIND" />
            <RegularFoodList />
            <BreakerText text="ALL RESTAURANT" />

        </View>
    )
}

export default ExploreSection