import { useState } from "react";
import { Alert, Button, Image, Modal, StyleSheet, Text, View } from "react-native";
import PlaceForm from "../components/Places/PlaceForm";

export default function ModalScreen({showModal,onPress}) {
    return (
        <View style={styles.container}>
            <Modal
            animationType = {"slide"}
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
                onPress.invoke()
                Alert.alert('Modal has now been closed.');
            }}>
            <Image
              source={require('../assets/scooby.jpeg')}
              style = { styles.image }/>
              <Text style = { styles.text }>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Maecenas eget tempus augue, a convallis velit.</Text>
                  <Button title="Close Modal" onPress={onPress}/>
          </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // padding: 25,
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 22,
      },
      image: {
        marginTop: 150,
        marginBottom: 10,
        width: '100%',
        height: 300,
      },
      text: {
        fontSize: 24,
        marginBottom: 30,
        padding: 40,
      }
})