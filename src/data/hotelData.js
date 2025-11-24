export const hotelsData = [
  {
    id: 1,
    title: "InterContinental Cairo Semiramis by IHG",
    title_ar: "فندق سميراميس إنتركونتيننتال القاهرة",
    image: "/images/intercontinental-semiramis.jpeg",
    description: "Experience luxury at its finest with the iconic InterContinental Cairo Semiramis, situated on the banks of the Nile River. This legendary 5-star hotel offers world-class amenities, impeccable service, and stunning views of Cairo's skyline and the Nile. Perfect for business travelers and tourists seeking premium accommodation in the heart of Egypt's vibrant capital.",
    location: "Nile Corniche, Cairo, Egypt",
    rating: 4.7,
    reviews: 1250,
    baseprice: 250,
    amenities: [
      "Free Wi-Fi",
      "Swimming Pool",
      "Spa & Wellness Center",
      "Multiple Restaurants",
      "24-Hour Concierge",
      "Fitness Center",
      "Business Center",
      "Nile River Views"
    ],
    rooms: [
      {
        id: "r1",
        type: "Single Room",
        refundable: true,
        price: 180,
        maxGuests: 1,
        bed: "Single Bed",
        amenities: ["Flat-screen TV", "Free Wi-Fi", "Air Conditioning", "Shower", "Work Desk"]
      },
      {
        id: "r2",
        type: "Single Room",
        refundable: false,
        price: 150,
        maxGuests: 1,
        bed: "Single Bed",
        amenities: ["Flat-screen TV", "Free Wi-Fi", "Air Conditioning", "Shower", "Work Desk"]
      },
      {
        id: "r3",
        type: "Double Room",
        refundable: true,
        price: 280,
        maxGuests: 2,
        bed: "Double Bed",
        amenities: ["Flat-screen TV", "Free Wi-Fi", "Air Conditioning", "Bathtub & Shower", "Work Desk", "Mini Bar"]
      },
      {
        id: "r4",
        type: "Double Room",
        refundable: false,
        price: 240,
        maxGuests: 2,
        bed: "Double Bed",
        amenities: ["Flat-screen TV", "Free Wi-Fi", "Air Conditioning", "Bathtub & Shower", "Work Desk", "Mini Bar"]
      },
      {
        id: "r5",
        type: "Suite",
        refundable: true,
        price: 450,
        maxGuests: 3,
        bed: "King Bed + Sofa",
        amenities: ["Flat-screen TV", "Free Wi-Fi", "Air Conditioning", "Luxury Bathroom", "Living Area", "Mini Bar", "Premium Toiletries"]
      },
      {
        id: "r6",
        type: "Suite",
        refundable: false,
        price: 380,
        maxGuests: 3,
        bed: "King Bed + Sofa",
        amenities: ["Flat-screen TV", "Free Wi-Fi", "Air Conditioning", "Luxury Bathroom", "Living Area", "Mini Bar", "Premium Toiletries"]
      },
      {
        id: "r7",
        type: "Deluxe Room",
        refundable: true,
        price: 350,
        maxGuests: 2,
        bed: "Queen Bed",
        amenities: ["Flat-screen TV", "Free Wi-Fi", "Air Conditioning", "Luxury Bathroom", "City View", "Mini Bar", "Work Desk"]
      },
      {
        id: "r8",
        type: "Deluxe Room",
        refundable: false,
        price: 300,
        maxGuests: 2,
        bed: "Queen Bed",
        amenities: ["Flat-screen TV", "Free Wi-Fi", "Air Conditioning", "Luxury Bathroom", "City View", "Mini Bar", "Work Desk"]
      }
    ]
  },
  {
    id: 2,
    title: "Sofitel Winter Palace Luxor",
    image: "https://images.unsplash.com/photo-1631049307038-da0ec9d70304?w=1200&h=600&fit=crop",
    description: "Discover the magic of ancient Egypt at the legendary Sofitel Winter Palace Luxor. This historic 5-star hotel overlooks the Nile River and is steps away from the Valley of the Kings. Experience timeless elegance combined with modern luxury amenities.",
    location: "Nile Corniche, Luxor, Egypt",
    rating: 4.6,
    reviews: 890,
    baseprice: 220,
    amenities: [
      "Free Wi-Fi",
      "Swimming Pool",
      "Spa",
      "River Cruises",
      "Restaurants",
      "Fitness Center"
    ],
    rooms: [
      {
        id: "r1",
        type: "Standard Room",
        refundable: true,
        price: 160,
        maxGuests: 1,
        bed: "Single Bed",
        amenities: ["Flat-screen TV", "Free Wi-Fi", "Air Conditioning"]
      },
      {
        id: "r2",
        type: "Standard Room",
        refundable: false,
        price: 130,
        maxGuests: 1,
        bed: "Single Bed",
        amenities: ["Flat-screen TV", "Free Wi-Fi", "Air Conditioning"]
      },
      {
        id: "r3",
        type: "Double Room",
        refundable: true,
        price: 250,
        maxGuests: 2,
        bed: "Double Bed",
        amenities: ["Flat-screen TV", "Free Wi-Fi", "Nile View", "Bathtub & Shower"]
      },
      {
        id: "r4",
        type: "Double Room",
        refundable: false,
        price: 210,
        maxGuests: 2,
        bed: "Double Bed",
        amenities: ["Flat-screen TV", "Free Wi-Fi", "Nile View", "Bathtub & Shower"]
      }
    ]
  },
  {
    id: 3,
    title: "Hilton Cairo Heliopolis",
    image: "https://images.unsplash.com/photo-1566163566359-90f06ba7c364?w=1200&h=600&fit=crop",
    description: "Modern luxury meets Egyptian hospitality at the Hilton Cairo Heliopolis. Located in the upscale Heliopolis district, this 5-star hotel offers contemporary design and world-class service.",
    location: "Heliopolis, Cairo, Egypt",
    rating: 4.5,
    reviews: 750,
    baseprice: 200,
    amenities: [
      "Free Wi-Fi",
      "Swimming Pool",
      "Fitness Center",
      "Restaurants",
      "Business Center"
    ],
    rooms: [
      {
        id: "r1",
        type: "Guest Room",
        refundable: true,
        price: 150,
        maxGuests: 1,
        bed: "Single Bed",
        amenities: ["Flat-screen TV", "Free Wi-Fi", "Air Conditioning"]
      },
      {
        id: "r2",
        type: "Guest Room",
        refundable: false,
        price: 120,
        maxGuests: 1,
        bed: "Single Bed",
        amenities: ["Flat-screen TV", "Free Wi-Fi", "Air Conditioning"]
      }
    ]
  }
];

export const getHotelById = (id) => {
  return hotelsData.find(hotel => hotel.id === parseInt(id));
};
