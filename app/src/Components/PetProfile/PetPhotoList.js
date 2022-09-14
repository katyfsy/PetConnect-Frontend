import React from "react";
import { LightgalleryItem } from "react-lightgallery";

const photos = [
  {
    src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    width: 4,
    height: 3,
  },
  {
    src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    width: 1,
    height: 1,
  },
  {
    src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
    width: 3,
    height: 4,
  },
  {
    src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
    width: 3,
    height: 4,
  },
  {
    src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
    width: 3,
    height: 4,
  },
  {
    src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
    width: 4,
    height: 3,
  },
  {
    src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
    width: 3,
    height: 4,
  },
  {
    src: "https://source.unsplash.com/PpOHJezOalU/800x599",
    width: 4,
    height: 3,
  },
  {
    src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    width: 4,
    height: 3,
  },
];

function PetPhotoList() {
  return (
    <div>
      <LightgalleryItem src="https://picsum.photos/1024/768?image=2">
        <img src="https://picsum.photos/200/300?image=2" />
        <img src="https://picsum.photos/200/300?image=2" />
      </LightgalleryItem>
      <LightgalleryItem src="https://picsum.photos/1024/768?image=1">
       <img src="https://picsum.photos/200/300?image=1" />
     </LightgalleryItem>
    </div>
  );
}

export default PetPhotoList;

/*  

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"
const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];

function PetPhotoList() {
  return (
    <ImageGallery items={images} />
  );
}

export default PetPhotoList;

*/