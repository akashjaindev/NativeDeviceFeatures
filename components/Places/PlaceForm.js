import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Place } from "../../models/Place";
import Button from "../UI/Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

export default function PlaceForm({onCreatePlace}) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [pickedLocation, setPickedLocation] = useState({});
  const [pickedImage, setPickedImage] = useState("");
  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }
  function savePlaceHandler() {
    const placeData = new Place(enteredTitle,pickedImage,pickedLocation)
    onCreatePlace(placeData)
  }
  function saveImageHandler(imageData) {
    setPickedImage(imageData);
  }
  const saveLocationHandler = useCallback((locationData) => {
    setPickedLocation(locationData);
  }, []);
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={enteredTitle}
          onChangeText={changeTitleHandler}
        />
      </View>
      <ImagePicker onImagetaken={saveImageHandler} />
      <LocationPicker onLocationTaken={saveLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    color: Colors.primary500,
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    // color:Colors.primary800,
    backgroundColor: Colors.primary100,
    paddingHorizontal: 4,
    paddingVertical: 8,
    marginVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
  },
});
