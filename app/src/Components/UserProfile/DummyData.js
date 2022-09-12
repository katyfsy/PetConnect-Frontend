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
  timeStamp: "time"
  },
  {reviewId: 2,
  firstName: "aaaa",
  lastName: "bbbb",
  userPhoto: photoURL.userPhoto,
  reviewTitle: "bAd",
  reviewDescription: "Terriblexxxxxx, xxxxxx, xxxxx, xxxxxxxxxxxxxxxx, xxxxxxxx, xxxxxxxxxxxxxxxxxxxxxx.",
  reviewScore: 1,
  upvotes: 3,
  timeStamp: "time"
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
  timeStamp: "time"
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
  timeStamp: "time"
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
  timeStamp: "time"
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
  timeStamp: "time"
  },
]

export default getUser;
export {photoURL, orgReviews};