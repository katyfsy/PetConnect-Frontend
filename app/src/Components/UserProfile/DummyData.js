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
    zipCode: '123456',
    description: 'I want to adopt them all. xxx xxxx xxxxxxxx xxxxxxxxx xxxx xxx x, xxx xxxxx xxxx xxxx, xxxxx xxxxxx xxxxx, xxxxx xxxxxxxxxxxx xxxxx xx xxxxxxx, xxxxxxx xxxxxx xxxxx xxxxx xxxxxx xxx.',
    userPhoto: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  }
};

const photoURL = {userPhoto: "https://ih1.redbubble.net/image.3309494331.9897/aps,504x498,medium,transparent-pad,600x600,f8f8f8.jpg"};

export default getUser;
export {photoURL};