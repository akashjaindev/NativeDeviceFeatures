import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";
import getMapPreview, { getAddress } from "../../util/location";
import { OutlinedButton } from "../UI/OutlinedButton";

export default function LocationPicker({onLocationTaken}) {
    const navigation = useNavigation()
    const route = useRoute();
  const [locationPermissions, requestPermission] = useForegroundPermissions();
  const [location, setLocation] = useState();
  const isFocussed=useIsFocused()

  useEffect(()=>{
    if(isFocussed && route.params){
      const mapPickedLocation = {lat: route.params.pickedLocation.lat,lng: route.params.pickedLocation.lng}
      if(mapPickedLocation){
        setLocation(mapPickedLocation)
      }
    }
  },[route,isFocussed])

  useEffect(()=>{
    async function handleAddress(){
      if(location){
        const address = await getAddress(location.lat,location.lng)
        onLocationTaken({...location,address:address})
      }
    }
    handleAddress()
  },[location,onLocationTaken])

  async function verifyPermissions() {
    {
      if (locationPermissions.status === PermissionStatus.UNDETERMINED) {
        const permissionResponse = await requestPermission();
        return permissionResponse.granted;
      } else if (locationPermissions.status == PermissionStatus.DENIED) {
        Alert.alert(
          "Insufficient Permissions",
          "You need to grant location permissions to use this app"
        );
        return false;
      }
      return true;
    }
  }
  async function getLocationHandler() {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }
    const locationValue = await getCurrentPositionAsync();
    setLocation({
      lat: locationValue.coords.latitude,
      lng: locationValue.coords.longitude,
    });
  }
  function pickOnMapHanlder() {
    navigation.navigate("Map")
  }
  return (
    <View>
      <View style={styles.mapPreview}>
        {location && (
          <Image
            style={styles.image}
            source={{ uri: getMapPreview(location.lat, location.lng) }}
          />
        )}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon={"location"} onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon={"map"} onPress={pickOnMapHanlder}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow:"hidden"
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image:{
    width:'100%',
    height:'100%'
  }
});
