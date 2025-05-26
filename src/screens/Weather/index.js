import React from 'react';
import { TouchableOpacity, View, TextInput, Keyboard } from 'react-native';
import styles from './Weather.styles';
import { Text } from "@/src/components/ui"
import { Image as CachedImage } from 'expo-image';
import Header from '../../components/Header/Header';
import { get } from 'lodash';
import { LinearGradient } from 'expo-linear-gradient';
import { Search } from 'lucide-react-native';
import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native';
import { WHITE_COLOR, BLACK_COLOR, DARK_THEME, LIGHT_THEME } from '../../utils/constants';
import WeatherHandler from './Weather.handler';

const Weather = () => {

const { width } = Dimensions.get('window');
const imageSize = width * 0.55; // 55% of screen width

const {
    colorMode,
    loading,
    showSearch,
    handleToggleSearch,
    handleSearchDebounce,
    canShowWeather,
    weather,
    isFetching,
    error,
    gradientColors,
  } = WeatherHandler();

let foreCastFrag = null;

if (!isFetching && error) {
  foreCastFrag = (
  <View className='flex-1 flex-row justify-center items-center'>
    <Text size='xl' bold className='text-red-800 bg-red-200 px-6 py-4 rounded-3xl'>{error}</Text>
  </View> 
  );
} else if (canShowWeather && get(weather, 'city')) {
foreCastFrag = (
<>
{/* forecast section */}
<View className='flex justify-center flex-1'>
    <Text className={`text-center ${colorMode === 'dark' ? 'text-white': 'text-black'}`} size='3xl' bold>{get(weather, 'city')}, 
      <Text className={`text-center ${colorMode === 'dark' ? 'text-white': 'text-black'}`} size='xl' bold>
        &nbsp;{get(weather, 'country')}
      </Text>
      </Text>
  <View className='flex-row flex justify-center'>
    <CachedImage
        style={{ width: imageSize, height: imageSize }}
        source={{
          uri: get(weather, 'icon'),
        }}
        contentFit="contain"
      />              
    </View>
    <View className='space-y-2'>
          <Text className={`text-center ml-5 ${colorMode === 'dark' ? 'text-white': 'text-black'}`} size='6xl' bold>{get(weather, 'temperature')}&#176;</Text>
          <Text className={`text-center ${colorMode === 'dark' ? 'text-white' : 'text-black'}`} size='xl' bold>{get(weather, 'condition')}</Text>
    </View>
  </View> 
  </>
);
}

return (
  <>
  <View className='flex-1 relative'>
    <LinearGradient
      colors={gradientColors}
      style={styles.background}
      start={colorMode === 'dark' && {x: 0, y: 0}}
      end={colorMode === 'dark' && {x: 0, y: 12}}
    />

    <View className='z-50 p-3'>
      <Header />
    </View>

{/* searchbar section */}
<View className='m-5 z-50 shadow-xl' style={{ height: '7%' }}>
  <View className='flex-row justify-end items-center rounded-full' style={{ backgroundColor: showSearch ? 'transparent' : WHITE_COLOR }}>
  {showSearch ? null : 
  (
    <TextInput
      onChangeText={handleSearchDebounce}
      placeholder='Search city'
      placeholderTextColor="black"
    className="flex-1 text-base font-semibold text-black px-6"
    style={{
      lineHeight: 16
    }}
    />
  )
  }
  <TouchableOpacity
  onPress={handleToggleSearch}
  style={{ backgroundColor: LIGHT_THEME}}
  className='rounded-full p-3 m-1'
  >
  <Search size={24} color={colorMode === 'dark'? WHITE_COLOR : BLACK_COLOR} />

  </TouchableOpacity>
  </View>
</View>

  {loading ? (
    <View className='flex-1 flex-row justify-center items-center'>
    <Progress.CircleSnail thickness={10} size={140} color={colorMode=== 'dark' ? LIGHT_THEME : DARK_THEME} />
    </View>
  ) : 
  foreCastFrag 
  } 
  </View> 
  </>
  )
};

export default Weather;

