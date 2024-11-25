import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useStyles } from 'react-native-unistyles';
import { cardStyles } from '@unistyles/cardStyles';
import CustomText from '@components/global/CustomText';
import { recommendedListData } from '@utils/dummyData';
import RestaurantCard from './RestaurantCard';

const RestaurantList = () => {

  const { styles } = useStyles(cardStyles);

  const renderItem = ({ item }: any) => {
    return (
      <RestaurantCard item={item} />
    )
  }

  return (
    <View>
      <CustomText style={styles.centerText} fontFamily='Okra-Bold' fontSize={12}>
        1823 restaurant delivering to you
      </CustomText>
      <CustomText style={styles.centerText} fontFamily='Okra-Bold' fontSize={12}>
        FEATURED
      </CustomText>

      <FlatList
        data={recommendedListData}
        scrollEventThrottle={16}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

    </View>
  )
}

export default RestaurantList