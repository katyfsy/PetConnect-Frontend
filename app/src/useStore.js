import create from 'zustand';

const useStore = create((set)=>({

  result: [],
  setResult: (result) => set(()=>({result})),

  searchQuery: "",
  setSearchQuery: (searchQuery) => set(()=>({searchQuery})),

  zipcode: "",
  setZipcode: (zipcode) => set(()=>({zipcode})),

  radius: "10",
  setRadius: (radius) => set(()=>({radius})),

  breed: "",
  setBreed: (breed) => set(()=>({breed})),

  type: "",
  setType: (type) => set(()=>({type})),


}));

export default useStore;