import { Alert, Button, Image, StyleSheet, View } from "react-native";
import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import { useEffect, useState } from "react";
import { Colors } from "../../constants/colors";
import { OutlinedButton } from "../UI/OutlinedButton";

export default function ImagePicker({ onImagetaken }) {
  const [cameraPermissions, requestPermission] = useCameraPermissions();
  const [imagePath, setImagePath] = useState("");
  async function verifyPermissions() {
    {
      if (cameraPermissions.status === PermissionStatus.UNDETERMINED) {
        const permissionResponse = await requestPermission();
        return permissionResponse.granted;
      } else if (cameraPermissions.status == PermissionStatus.DENIED) {
        Alert.alert(
          "Insufficient Permissions",
          "You need to grant camera permissions to use this app"
        );
        return false;
      }
      return true;
    }
  }
  useEffect(() => {
    onImagetaken(imagePath);
  }, [imagePath]);
  async function takeImage() {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!image.canceled) {
      setImagePath(image.assets[0].uri);
    } else {
      console.log("cancelled");
    }
  }
  return (
    <View>
      <View style={styles.imagePreview}>
        {imagePath && (
          <Image style={styles.image} source={{ uri: imagePath }} />
        )}
      </View>
      <OutlinedButton icon={"camera"} onPress={takeImage}>
        Take Photo
      </OutlinedButton>
      {/* <Button title="Take Image" onPress={takeImage} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
