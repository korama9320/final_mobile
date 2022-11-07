import { user } from "../types";

export function userReducer(
  state = {
    user: {
      email: "3bdo9320@gmail.com",
      username: "Abdelrahman Hamdy",
      age: 25,
      weight: 73,
      height: 192,
      gender: "male",
      fat: 14,
      phoneNumber: "01004379033",
      address: "aswan,aswan",
      endDate: "11/15/2022",
      subscription: "premium",

      exersiceHistory: [
        {
          exerciseName: "exname41",
          exBodyPart: "push",
          exTools: "metal",
          exStaticImage:
            "C:\\fakepath\\beautiful-columns-kom-ombo-temple-night-illuminated-temple-sobek-horus.jpg",
          exGifImage:
            "C:\\fakepath\\beautiful-columns-kom-ombo-temple-night-illuminated-temple-sobek-horus.jpg",
          exAdditionNotes: "notes here",
          date: "2022-10-30T09:58:34.577Z",
        },
        {
          exerciseName: "exName1",
          exBodyPart: "Abs",
          exTools: ["Dumbbells", "Bench"],
          exStaticImage:
            "https://acewebcontent.azureedge.net/exercise-library/large/7-1.jpg",
          exGifImage: "images/apiImages/id1Gif.gif",
          exAdditionNotes: ["Exercise steps are: 1 lorem"],
          date: "2022-10-30T11:05:08.899Z",
        },
        {
          exerciseName: "exName3",
          exBodyPart: "full body",
          exTools: ["Bench"],
          exStaticImage:
            "https://acewebcontent.azureedge.net/exercise-library/large/7-1.jpg",
          exGifImage: "images/apiImages/id1Gif.gif",
          exAdditionNotes: ["Repeat 4 sets"],
          date: "2022-10-30T11:37:32.146Z",
        },
        {
          exerciseName: "exName2",
          exBodyPart: "Abs",
          exTools: ["Dumbbells"],
          exStaticImage:
            "https://acewebcontent.azureedge.net/exercise-library/large/7-1.jpg",
          exGifImage: "images/apiImages/id1Gif.gif",
          exAdditionNotes: ["Repeat 3 sets every set with 15 step"],
          date: "2022-10-30T11:37:35.752Z",
        },
      ],
      healthyFoodHistory: [
        {
          foodName: "Potato muffin",
          foodTime: "Brackfast",
          foodType: "Sweet Food",
          ingredients:
            "A cup of whole wheat flour, half a tablespoon of baking powder, a quarter of a teaspoon of salt, a teaspoon of dried thyme, a cup of mashed potatoes, 2 egg whites, a quarter of a tablespoon of olive oil, and a quarter of a tablespoon of honey.",
          imgFood: "public\\HealthyFood\\Sweet3.jpg",
          date: "2022-10-31T16:30:17.528Z",
        },
        {
          foodName: "A jar of quick oats",
          foodTime: "Brackfast",
          foodType: "Sweet Food",
          ingredients:
            "Half a cup of uncooked instant oats, a small pinch of salt, half a small spoonful of cinnamon powder, a banana or any other fruit you like, half a small spoonful of almonds and a glass of water.",
          imgFood: "public\\HealthyFood\\Sweet1.jpg",
          date: "2022-10-31T16:51:39.514Z",
        },
      ],
    },
  },
  action
) {
  switch (action.type) {
    case user:
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return { ...state };
  }
}
