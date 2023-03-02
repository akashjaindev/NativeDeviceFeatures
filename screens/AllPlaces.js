import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, View } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { fetchPlace } from "../util/database";
import ModalScreen from "./ModalScreen";

export default function AllPlaces({ route }) {
  const [showModal, setModalVisibility] = useState(false);
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocussed = useIsFocused();
  function showModalHandler() {
    setModalVisibility(!showModal);
  }
  useEffect(() => {
    async function loadPlaces(){
      const response = await fetchPlace()
      setLoadedPlaces(response)
    }
    if (isFocussed) {
      loadPlaces()
      // setLoadedPlaces((currentPlaces) => [
      //   ...currentPlaces,
      //   route.params.place,
      // ]);
    }
  }, [isFocussed]);
  return (
    <View style={{ flex: 1, paddingBottom: 16 }}>
      <PlacesList places={loadedPlaces} />
      {showModal && (
        <ModalScreen showModal={showModal} onPress={showModalHandler} />
      )}
      {!showModal && <Button title="Show Modal" onPress={showModalHandler} />}
    </View>
  );
}
