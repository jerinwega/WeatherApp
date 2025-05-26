import React, { useEffect, useState, useContext, useCallback } from 'react';
import { TouchableOpacity, View, TextInput, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherByCity } from '../../redux/actions/weatherAction';
import styles from './Weather.styles';
import { Text } from "@/src/components/ui"
import { Image as CachedImage } from 'expo-image';
import Header from '../../components/Header/Header';
import { get, debounce } from 'lodash';
import { LinearGradient } from 'expo-linear-gradient';
import { Search } from 'lucide-react-native';
import { ThemeContext } from '../../../App';
import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native';
import { storeData, getData } from '@/src/utils/asyncStorage';
import { WHITE_COLOR, BLACK_COLOR, DARK_THEME, LIGHT_THEME, YELLOW_400 } from '../../utils/constants';


const Weather = () => {


const { colorMode } = useContext(ThemeContext);
const { width } = Dimensions.get('window');
const imageSize = width * 0.55; // 55% of screen width
const dispatch = useDispatch();
const { weather, isFetching, error } = useSelector((state) => state.weather);

const [showSearch, toggleSearch] = useState(false);
const [loading, setLoading] = useState(false);
const [canShowWeather, setCanShowWeather] = useState(true);



useEffect(() => {
fetchInitialWeatherByCity();
}, [])

const fetchInitialWeatherByCity = async () => {
const savedCity = await getData('city');
if (savedCity) {
dispatch(fetchWeatherByCity(savedCity));
}
}


const handleSearch = async (value) => {
  setLoading(true);
  setCanShowWeather(false);

if (value.length > 2) {
  try {
    const result = await dispatch(fetchWeatherByCity(value));

    if (get(result,'city')) {
      storeData('city', get(result, 'city'));
        setLoading(true);
    } else {
      setLoading(false);

    }
  } catch (error) {
    setLoading(false);
    console.error('Search error:', error);
  }
}
};

const handleToggleSearch = () => {
setLoading(false);
Keyboard.dismiss();
toggleSearch(!showSearch);
if (get(weather, 'city')) {
  setCanShowWeather(true);
}

};



const handleSearchDebounce = useCallback(debounce(handleSearch, 500), []);



const gradientColors =
  colorMode === 'dark'
    ? [DARK_THEME, YELLOW_400] // black to yellow-400
    : [WHITE_COLOR, LIGHT_THEME]; // white to blue-600




let foreCastFrag = null;

if ((!isFetching && error)) {
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
  <View className='flex-row justify-end items-center rounded-full' style={{ backgroundColor: WHITE_COLOR }}>
  <TextInput
    onChangeText={handleSearchDebounce}
    placeholder='Search city'
    placeholderTextColor="black"
   className="flex-1 text-base font-semibold text-black px-6"
  style={{
    lineHeight: 16
  }}
  />
  <TouchableOpacity
  onPress={handleToggleSearch}
  style={{ backgroundColor: colorMode === 'dark' ? DARK_THEME : LIGHT_THEME}}
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
) : foreCastFrag } 
  </View> 
  </>
)
};

export default Weather;

