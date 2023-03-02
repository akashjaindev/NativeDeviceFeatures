import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { OutlinedButton } from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { fetchPlaceById } from "../util/database";

export default function PlaceDetails({ route, navigation }) {
  const [place, setPlace] = useState();
  function showOnMapHandler() {
    navigation.navigate("Map",{
        lat:place.location.lat,lng:place.location.lng
    })
  }
  const selectedPlaceId = route.params.placeId;
  useEffect(() => {
    async function getPlaceGetail() {
      const place = await fetchPlaceById(selectedPlaceId);
      setPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }
    getPlaceGetail();
  }, [selectedPlaceId]);
  if(!place){
    return <View style={styles.fallback}>
        <Text>Loading Place Data...</Text>
    </View>
  }
  return (
    <ScrollView>
      <Image style={styles.image} source={{uri:place.imageUri}}/>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <OutlinedButton icon={"map"} onPress={showOnMapHandler}>
          View On Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    fallback:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
