const Images = [
    { image: require("../assets/restaurants/kfc.jpg") },
    { image: require("../assets/restaurants/green-hotel.png") },
    { image: require("../assets/restaurants/bajeko-sekuwa.png") },
    { image: require("../assets/restaurants/kfc.jpg") },
];

export const markers = [
    {
      coordinate: {
        latitude: 27.6257542,
        longitude: 55.5502664,
      },
      title: "Amazing Food Place",
      description: "This is the best food place",
      image: Images[0].image,
      rating: 4,
      reviews: 99,
    },
    {
      coordinate: {
        latitude: 27.6185048,
        longitude: 85.5478994,
      },
      title: "Second Amazing Food Place",
      description: "This is the second best food place",
      image: Images[1].image,
      rating: 5,
      reviews: 102,
    },
    {
      coordinate: {
        latitude:27.6201311,
        longitude: 85.5511586
      },
      title: "Third Amazing Food Place",
      description: "This is the third best food place",
      image: Images[2].image,
      rating: 3,
      reviews: 220,
    },
    {
      coordinate: {
        latitude: 27.6217791,
        longitude: 85.5512268,
      },
      title: "Fourth Amazing Food Place",
      description: "This is the fourth best food place",
      image: Images[3].image,
      rating: 4,
      reviews: 48,
    },
    {
      coordinate: {
        latitude: 27.61926,
        longitude: 85.5527804,
      },
      title: "Fifth Amazing Food Place",
      description: "This is the fifth best food place",
      image: Images[3].image,
      rating: 4,
      reviews: 178,
    },
];
