import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

export default function Map({ navigation, route }) {
  const initailLocation = route.params && {
    lat: route.params.lat,
    lng: route.params.lng,
  }
  const region = {
    latitude: initailLocation?initailLocation.lat:37.78825,
    longitude: initailLocation?initailLocation.lng:-122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const [selectedLocation, setSelectedLocation] = useState(initailLocation);

  useLayoutEffect(() => {
    if(initailLocation){
      return
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocation}
        />
      ),
    });
  }, [navigation, selectLocationHandler]);

  function selectLocationHandler(event) {
    if(initailLocation){
      return
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: lat, lng: lng });
  }
  const savePickedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No Lcoation Found",
        "You have to pick location (by tapping on map) first"
      );
      return;
    }
    navigation.navigate("AddPlace", { pickedLocation: selectedLocation });
  },[navigation,selectedLocation]);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker
            title="Picked Location"
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
