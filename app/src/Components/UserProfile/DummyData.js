function getUser() {
  return {
    firstName: 'Kun',
    lastName: 'Chen',
    businessName: '123 Animal Shelter',
    phone: '123-456-7890',
    email: 'kun.chen@gmail.com',
    website: '123animal.com',
    userType: 'individual',
    address: '123 main st',
    city: 'Phoenix',
    state: 'AZ',
    zipCode: '123456',
    description: 'I want to adopt them all.',
    photo: "https://media.geeksforgeeks.org/wp-content/uploads/20210425000233/test-300x297.png"
  }
};

const photoURL = {photo: "https://www.color-meanings.com/wp-content/uploads/yellow-shades.png"};

export default getUser;
export {photoURL};