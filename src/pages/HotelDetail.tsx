import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin, Wifi, Car, Coffee, Waves, Phone, Mail, Clock, Users } from "lucide-react";
import hotelRoom1 from "@/assets/hotel-room-1.jpg";
import hotelRoom2 from "@/assets/hotel-room-2.jpg";
import hotelRoom3 from "@/assets/hotel-room-3.jpg";

const HotelDetail = () => {
  const { id } = useParams();

  // Sample hotel data (in real app, this would be fetched based on id)
  const hotel = {
    id: "1",
    name: "Grand Himalaya Hotel",
    location: "Thamel, Kathmandu", 
    rating: 4.8,
    reviews: 1248,
    price: 8500,
    images: [hotelRoom1, hotelRoom2, hotelRoom3],
    amenities: ["wifi", "parking", "restaurant", "pool"],
    description: "Experience luxury in the heart of Kathmandu at Grand Himalaya Hotel. Our establishment combines traditional Nepali hospitality with modern amenities to create an unforgettable stay. Located in the vibrant Thamel district, you'll be within walking distance of shops, restaurants, and cultural attractions.",
    fullDescription: "Grand Himalaya Hotel stands as a beacon of luxury and comfort in Kathmandu's bustling Thamel district. Our hotel features beautifully appointed rooms and suites, each designed with a perfect blend of contemporary elegance and traditional Nepali aesthetics. Guests can enjoy stunning views of the Himalayan range from our rooftop terrace, indulge in authentic cuisine at our multi-cuisine restaurant, and relax in our spa and wellness center.",
    contact: {
      phone: "+977-1-4444444",
      email: "info@grandhimalaya.com",
      address: "Thamel Marg, Kathmandu 44600, Nepal"
    },
    policies: {
      checkIn: "2:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Free cancellation up to 24 hours before arrival",
      children: "Children of all ages are welcome"
    },
    rooms: [
      {
        id: "deluxe",
        name: "Deluxe Room",
        price: 8500,
        capacity: 2,
        description: "Spacious room with city view, king bed, and modern amenities",
        amenities: ["King Bed", "City View", "AC", "WiFi", "Mini Bar"]
      },
      {
        id: "suite",
        name: "Executive Suite", 
        price: 15000,
        capacity: 4,
        description: "Luxurious suite with separate living area and mountain view",
        amenities: ["King Bed", "Mountain View", "Living Area", "AC", "WiFi", "Mini Bar", "Balcony"]
      },
      {
        id: "standard",
        name: "Standard Room",
        price: 6500, 
        capacity: 2,
        description: "Comfortable room with essential amenities for budget travelers",
        amenities: ["Queen Bed", "AC", "WiFi", "Mini Fridge"]
      }
    ]
  };

  const amenityIcons: { [key: string]: any } = {
    wifi: Wifi,
    parking: Car,
    restaurant: Coffee,
    pool: Waves,
  };

  const amenityLabels: { [key: string]: string } = {
    wifi: "Free WiFi",
    parking: "Free Parking", 
    restaurant: "Restaurant",
    pool: "Swimming Pool"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96">
        <img 
          src={hotel.images[0]} 
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-8 left-8 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-accent text-accent-foreground">Featured</Badge>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-secondary text-secondary" />
              <span className="font-semibold">{hotel.rating}</span>
              <span className="opacity-75">({hotel.reviews} reviews)</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">{hotel.name}</h1>
          <div className="flex items-center gap-1 text-lg">
            <MapPin className="h-5 w-5" />
            <span>{hotel.location}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Photos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {hotel.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${hotel.name} - Image ${index + 1}`}
                      className="rounded-lg h-48 w-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">About This Hotel</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {hotel.description}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {hotel.fullDescription}
                </p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hotel.amenities.map((amenity) => {
                    const IconComponent = amenityIcons[amenity] || Coffee;
                    const label = amenityLabels[amenity] || amenity;
                    return (
                      <div key={amenity} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <IconComponent className="h-5 w-5 text-primary" />
                        <span className="font-medium">{label}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Available Rooms */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Available Rooms</h2>
                <div className="space-y-6">
                  {hotel.rooms.map((room) => (
                    <div key={room.id} className="border rounded-lg p-6 hover:shadow-medium transition-shadow">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                          <p className="text-muted-foreground mb-3">{room.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>Up to {room.capacity} guests</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {room.amenities.map((amenity) => (
                              <Badge key={amenity} variant="secondary" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary mb-1">
                            Rs. {room.price.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground mb-3">per night</div>
                          <Link to={`/hotels/${hotel.id}/book?room=${room.id}`}>
                            <Button variant="hero">
                              Book Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Book Card */}
              <Card className="shadow-strong">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-primary mb-1">
                      Rs. {hotel.price.toLocaleString()}
                    </div>
                    <div className="text-muted-foreground">per night</div>
                  </div>
                  
                  <Link to={`/hotels/${hotel.id}/book`} className="block">
                    <Button variant="hero" size="lg" className="w-full">
                      Book Now
                    </Button>
                  </Link>
                  
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Free cancellation • No booking fees
                  </p>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{hotel.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{hotel.contact.email}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-sm">{hotel.contact.address}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hotel Policies */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Hotel Policies</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Check-in:</span>
                      <span className="font-medium">{hotel.policies.checkIn}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Check-out:</span>
                      <span className="font-medium">{hotel.policies.checkOut}</span>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-muted-foreground mb-1">Cancellation:</div>
                      <div className="text-xs">{hotel.policies.cancellation}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Children:</div>
                      <div className="text-xs">{hotel.policies.children}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;