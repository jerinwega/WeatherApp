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





const Weather = () => {

  const { colorMode } = useContext(ThemeContext);
  const { width } = Dimensions.get('window');
  const imageSize = width * 0.55; // 40% of screen width

  const dispatch = useDispatch();
  const { weather, isFetching, error } = useSelector((state) => state.weather);
  const [showSearch, toggleSearch] = useState(false);
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canShowWeather, setCanShowWeather] = useState(false);



// useEffect(() => {
//   dispatch(fetchWeatherByCity('London'));
// }, [])



const handleSearch = async (value) => {
        setLoading(true);
        setCanShowWeather(false);

  if (value.length > 2) {
    try {
      const result = await dispatch(fetchWeatherByCity(value));

      if (get(result,'city')) {
        setLocation([result]);  
          setLoading(true);
      } else {
        setLocation([]);               
        setLoading(false);

      }
    } catch (error) {
      setLoading(false);
      console.error('Search error:', error);
      setLocation([]);
    }
  }
};

const handleToggleSearch = () => {
  setLoading(false);
  Keyboard.dismiss();
  toggleSearch(!showSearch);
  setLocation([]);
  if (get(weather, 'city')) {
    setCanShowWeather(true);
  }

};



const handleSearchDebounce = useCallback(debounce(handleSearch, 500), []);



  const gradientColors =
    colorMode === 'dark'
      ? ['#262626', '#facc15'] // black to yellow-400
      : ['#ffffff', '#2563eb']; // white to blue-600




let foreCastFrag = null;

if ((!isFetching && error)) {
  foreCastFrag = (
  <View className='flex-1 flex-row justify-center items-center'>
    <Text size='xl' bold className='text-red-800 bg-red-200 px-6 py-4 rounded-3xl'>{error}</Text>
  </View> 
  );
}

else if (canShowWeather && get(weather, 'city')) {
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
      />

      <View className='z-50 p-3'>
        <Header />
      </View>





      
{/* searchbar section */}

<View className='m-5 z-50 shadow-xl' style={{ height: '7%' }}>
<View className='flex-row justify-end items-center rounded-full' style={{ backgroundColor: 'white' }}>
  <TextInput
    onChangeText={handleSearchDebounce}
    placeholder='Search city'
    placeholderTextColor="black"
    className='pl-6 h-full flex-1 text-base font-semibold text-black'
    style={{ textAlignVertical: 'center' }}
  />
<TouchableOpacity
  onPress={handleToggleSearch}
  style={{ backgroundColor: colorMode === 'dark' ? '#262626' : '#2563eb'}}
  className='rounded-full p-3 m-1'
  >
<Search size={24} color={colorMode === 'dark'? "white" : "black"} />

</TouchableOpacity>

  </View>

  </View>



{loading && !canShowWeather ? (
  <View className='flex-1 flex-row justify-center items-center'>
  <Progress.CircleSnail thickness={10} size={140} color={colorMode=== 'dark' ? '#2563eb' : '#262626'} />
  </View>

) : foreCastFrag } 
    </View> 

    </>

  )
};

export default Weather;

