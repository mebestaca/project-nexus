import { View, StyleSheet } from "react-native";

interface Props {
  children: React.ReactNode;
  [key: string]: any;
}

export default function Table({
  children,
  ...props
}: Props) {

  return (
    <View
      {...props}
      style={styles.table}
    >
      {children}
    </View>
  );
}


const styles = StyleSheet.create({

  table:{
    width:350,
    height:500,
    backgroundColor:"#222",
    overflow:"hidden",
  },

});