import React, { useEffect, useState } from 'react';
// import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherByCity } from '../../redux/actions/weatherAction';
import styles from './Weather.styles';
import { VStack } from "@/src/components/ui"
import Header from '../../components/Header/Header';


const Weather = () => {


  const [city, setCity] = useState('London');
  const dispatch = useDispatch();
  const { weather, isFetching, error } = useSelector((state) => state.weather);

  // const handleSearch = () => {
  //   if (city.trim()) {
  //     dispatch(fetchWeatherByCity(city));
  //   }
  // };


useEffect(() => {
  dispatch(fetchWeatherByCity(city));
}, [])



console.log("weather", weather)


  return (
  <VStack flex={1}>
      <Header />
    </VStack>
  )
};

export default Weather;




  {/* <View style={{ padding: 20 }}>
      <TextInput
        value={city}
        onChangeText={setCity}
        placeholder="Enter city"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Get Weather" onPress={handleSearch} />
        </View> */}



      {/* {isFetching && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
      {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
      {weather.city && !isFetching && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>{weather.city}</Text>
          <Text style={{ fontSize: 16 }}>{weather.temperature}°C</Text>
          <Text>{weather.condition}</Text>
          <Image source={{ uri: weather.icon }} style={{ width: 80, height: 80 }} />
        </View>
      )}
    </View> */}
    {/* </> */}
