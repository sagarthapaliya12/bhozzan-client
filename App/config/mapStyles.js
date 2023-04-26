import colors from "./colors";

export const mapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: colors.gray }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#000000" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: colors.gray }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: colors.gray }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: colors.gray }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: colors.lightGray }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: colors.lightGray }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: colors.darkGray2 }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: colors.darkGray2 }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: colors.lightGray }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: colors.secondary }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: colors.darkGray2 }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: colors.lightGray }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: colors.gray }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: colors.gray }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: colors.screen }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: colors.blue }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: colors.blue }],
  },
];
