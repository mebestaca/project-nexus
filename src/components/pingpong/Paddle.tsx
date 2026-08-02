import { View, StyleSheet } from "react-native";

interface Props {
  x:number;
  y:number;
  width:number;
  height:number;
}

export default function Paddle({ x, y, width, height}: Props) {

  return (

    <View style={[
        styles.paddle,
        {
          left:x,
          top:y,
          width,
          height,
        }
      ]}
    />
  );
}

const styles = StyleSheet.create({

  paddle:{
    position:"absolute",
    backgroundColor:"white",
  },

});