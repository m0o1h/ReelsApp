import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const Styles = StyleSheet.create({
  //Views
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: "center",
  },
  flatlistoutercontainer: {
    top: 40,
    flex: 1,
    backgroundColor: "#252527",
  },
  flatlistinnercontainer: {
    flex: 1,
    flexDirection: "column",
  },

  //Buttons
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },


  //Texts
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  titleText: {
    position: "absolute",
    top: 0,
    fontSize: 20,
    left: 15,
    color: "white",
    fontWeight: "bold",
  },
  likeCommentsText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },


  //Modal
  modal: {
    height: "60%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalCloseTouchable: {
    width: "100%",
    height: "40%",
  },
  modalFlatlistinnercontainer: {
    backgroundColor: "#EAEAEA",
    width: "95%",
    left: 10,
    borderRadius: 10,
    marginVertical: 5,
    padding: 5,
    flexDirection: "row",
  },
  modalFlatlistinnerText: {
    left: 5,
    fontWeight: "bold",
    fontSize: 20,
    width: "94%",
  },
  modalFlatlistinnerDeleteButton: {
    right: 0,
    position: "absolute",
    alignSelf: "center",
  },
  modalTextInputButtonLayout: {
    flexDirection: "row",
    bottom: 3,
  },


  //FlatList
  flatlist: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  flatListImage: {
    width: width,
    height: height,
  },

  floatingTouchableOpacity: {
    position: "absolute",
    bottom: 45,
    right: 20,
  },
  

  //TextInput
  commentsInput: {
    borderRadius: 5,
    borderWidth: 1,
    width: "75%",
    padding: 5,
    marginHorizontal: 5,
  },
  fileNameInputField: {
    width: 350,
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    marginVertical: 5,
  },
});

export {Styles}