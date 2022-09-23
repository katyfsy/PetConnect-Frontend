function getUser() {
  return {
    username: 'kunchen123',
    firstName: 'Kun',
    lastName: 'Chen',
    businessName: '123 Animal Shelter',
    phone: '123-456-7890',
    email: 'kun.chen@gmail.com',
    website: '123animal.com',
    userType: 'individua',
    address: '123 main st',
    city: 'Phoenix',
    state: 'AZ',
    zipCode: '',
    description: 'I want to adopt them all. xxx xxxx xxxxxxxx xxxxxxxxx xxxx xxx x, xxx xxxxx xxxx xxxx, xxxxx xxxxxx xxxxx, xxxxx xxxxxxxxxxxx xxxxx xx xxxxxxx, xxxxxxx xxxxxx xxxxx xxxxx xxxxxx xxx.',
    userPhoto: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  }
};

const photoURL = {userPhoto: "https://ih1.redbubble.net/image.3309494331.9897/aps,504x498,medium,transparent-pad,600x600,f8f8f8.jpg"};

const orgReviews = [
  {reviewId: 1,
  firstName: "Kun",
  lastName: "Chen",
  userPhoto: photoURL.userPhoto,
  reviewTitle: "Good",
  reviewDescription: "Nicexxxxxx, xxxxxx, xxxxx, xxxxxxxxxxxxxxxx, xxxxxxxx, xxxxxxxxxxxxxxxxxxxxxx.",
  reviewScore: 5,
  upvotes: 2,
  timeStamp: "2022-09-12T11:33:54.005406",
  reviewImages: ["https://media.istockphoto.com/photos/boxes-picture-id83637181?b=1&k=20&m=83637181&s=170667a&w=0&h=3Ho0SwmMFbrMM9dC76wzSMshf_I8kTWKInuH1iMw77M=", "https://upload.wikimedia.org/wikipedia/commons/4/4a/100x100_logo.png"]
  },
  {reviewId: 2,
  firstName: "aaaa",
  lastName: "bbbb",
  userPhoto: photoURL.userPhoto,
  reviewTitle: "bAd",
  reviewDescription: "Terriblexxxxxx, xxxxxx, xxxxx, xxxxxxxxxxxxxxxx, xxxxxxxx, xxxxxxxxxxxxxxxxxxxxxx.",
  reviewScore: 1,
  upvotes: 3,
  timeStamp: "2022-09-10T11:33:54.005406",
  reviewImages: ["https://media.istockphoto.com/photos/boxes-picture-id83637181?b=1&k=20&m=83637181&s=170667a&w=0&h=3Ho0SwmMFbrMM9dC76wzSMshf_I8kTWKInuH1iMw77M=", "https://upload.wikimedia.org/wikipedia/commons/4/4a/100x100_logo.png", "https://dummyimage.com/250/ffffff/000000", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX6oSZ1z4HOL6piEPh_E0BprfaN_IdBAwveX5zNf7uG_C9tcPCj755wsNagrs5EaWA&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcOvFn3dAbybSGsoZRh_5VcaytcVAZyk3Y8XhOd3j7GoGoTGRxdlyssPOM-Bl9c1yjGhA&usqp=CAU"]
  },
  {
  reviewId: 3,
  firstName: "ccc",
  lastName: "ddd",
  userPhoto: photoURL.userPhoto,
  reviewTitle: "Good!!!",
  reviewDescription: "Nice!!!xxxxxx, xxxxxx, xxxxx, xxxxxxxxxxxxxxxx, xxxxxxxx, xxxxxxxxxxxxxxxxxxxxxx.",
  reviewScore: 4,
  upvotes: 0,
  timeStamp: "2022-09-13T11:33:54.005406",
  reviewImages: ["https://media.istockphoto.com/photos/boxes-picture-id83637181?b=1&k=20&m=83637181&s=170667a&w=0&h=3Ho0SwmMFbrMM9dC76wzSMshf_I8kTWKInuH1iMw77M="]
  },
  {
  reviewId: 4,
  firstName: "eee",
  lastName: "fff",
  userPhoto: photoURL.userPhoto,
  reviewTitle: "GOOD",
  reviewDescription: "NICExxxxxx, xxxxxx, xxxxx, xxxxxxxxxxxxxxxx, xxxxxxxx, xxxxxxxxxxxxxxxxxxxxxx.",
  reviewScore: 3,
  upvotes: 6,
  timeStamp: "2022-09-13T08:33:54.005406",
  reviewImages: ["https://media.istockphoto.com/photos/boxes-picture-id83637181?b=1&k=20&m=83637181&s=170667a&w=0&h=3Ho0SwmMFbrMM9dC76wzSMshf_I8kTWKInuH1iMw77M=", "https://upload.wikimedia.org/wikipedia/commons/4/4a/100x100_logo.png"]
  },
  {
  reviewId: 5,
  firstName: "ggg",
  lastName: "hhh",
  userPhoto: photoURL.userPhoto,
  reviewTitle: "GOOD!",
  reviewDescription: "NICE! xxxxxx, xxxxxx, xxxxx, xxxxxxxxxxxxxxxx, xxxxxxxx, xxxxxxxxxxxxxxxxxxxxxx.",
  reviewScore: 5,
  upvotes: 11,
  timeStamp: "2022-09-08T11:33:54.005406",
  reviewImages: ["https://media.istockphoto.com/photos/boxes-picture-id83637181?b=1&k=20&m=83637181&s=170667a&w=0&h=3Ho0SwmMFbrMM9dC76wzSMshf_I8kTWKInuH1iMw77M=", "https://upload.wikimedia.org/wikipedia/commons/4/4a/100x100_logo.png", "https://p.kindpng.com/picc/s/70-708489_email-icons-100x100-png-transparent-png.png"]
  },
  {
  reviewId: 6,
  firstName: "ii",
  lastName: "jj",
  userPhoto: photoURL.userPhoto,
  reviewTitle: "GOOD!",
  reviewDescription: "NICE!!! xxxxxx, xxxxxx, xxxxx, xxxxxxxxxxxxxxxx, xxxxxxxx, xxxxxxxxxxxxxxxxxxxxxx.",
  reviewScore: 2,
  upvotes: 11,
  timeStamp: "2022-09-13T12:33:54.005406",
  reviewImages: []
  },
]
const EMAIL_JS ={
  REACT_APP_SECRET_KEY: 'supersecretpsb123',
  REACT_APP_TEMPLATE_ID: 'template_cuioiov',
  REACT_APP_SERVICE_ID: 'service_r0k2eyh',
  REACT_APP_USER_ID: 'KowJ5SR4XG510Yyyk'
}

export default getUser;
export {photoURL, orgReviews, EMAIL_JS};