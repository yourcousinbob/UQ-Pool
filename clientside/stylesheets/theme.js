import { StyleSheet } from "react-native";

export const COLORS = {
  primary: "#65388E",
  secodary: "#65388E",
  tertiary: "#65388E",
  purple: "#65388E",
};

export const BOX = {
  borderRadius: 20,
};

export const FONT_SIZE = {
  heading2: 23,
  heading3: 20,
  text: 18,
};

export const box = StyleSheet.create({
  shadows: {
    shadowOffset: { height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: "gray",
  },
  base: {
    borderRadius: 20,
    padding: 15,
  }
});