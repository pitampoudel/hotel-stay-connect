import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import HotelCard from "@/components/ui/HotelCard";
import { Search, Filter, MapPin, Star } from "lucide-react";
import hotelRoom1 from "@/assets/hotel-room-1.jpg";
import hotelRoom2 from "@/assets/hotel-room-2.jpg";
import hotelRoom3 from "@/assets/hotel-room-3.jpg";

const Hotels = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [minRating, setMinRating] = useState("any");

  // Sample hotel data
  const hotels = [
    {
      id: "1",
      name: "Grand Himalaya Hotel",
      location: "Thamel, Kathmandu",
      rating: 4.8,
      reviews: 1248,
      price: 8500,
      image: hotelRoom1,
      amenities: ["wifi", "parking", "restaurant", "pool"],
      description: "Luxury hotel in the heart of Kathmandu with stunning mountain views and world-class amenities."
    },
    {
      id: "2", 
      name: "Royal Palace Resort",
      location: "Lakeside, Pokhara",
      rating: 4.6,
      reviews: 892,
      price: 12000,
      image: hotelRoom2,
      amenities: ["wifi", "restaurant", "pool", "parking"],
      description: "Elegant lakeside resort offering breathtaking views of Phewa Lake and the Annapurna range."
    },
    {
      id: "3",
      name: "Business Central Hotel", 
      location: "New Baneshwor, Kathmandu",
      rating: 4.4,
      reviews: 567,
      price: 6500,
      image: hotelRoom3,
      amenities: ["wifi", "parking", "restaurant"],
      description: "Modern business hotel perfect for corporate travelers with state-of-the-art meeting facilities."
    },
    {
      id: "4",
      name: "Mountain View Lodge",
      location: "Nagarkot, Bhaktapur",
      rating: 4.7,
      reviews: 423,
      price: 9500,
      image: hotelRoom1,
      amenities: ["wifi", "restaurant", "parking"],
      description: "Peaceful retreat with panoramic mountain views and traditional Nepali hospitality."
    },
    {
      id: "5",
      name: "City Center Plaza",
      location: "Lazimpat, Kathmandu",
      rating: 4.2,
      reviews: 789,
      price: 7800,
      image: hotelRoom2,
      amenities: ["wifi", "parking", "restaurant", "pool"],
      description: "Contemporary hotel in prime location with easy access to major attractions."
    },
    {
      id: "6",
      name: "Heritage Boutique Hotel",
      location: "Bhaktapur Durbar Square",
      rating: 4.9,
      reviews: 634,
      price: 15000,
      image: hotelRoom3,
      amenities: ["wifi", "restaurant", "parking"],
      description: "Authentic Newari architecture hotel offering cultural immersion experience."
    }
  ];

  const locations = ["All Locations", "Kathmandu", "Pokhara", "Bhaktapur", "Chitwan", "Lumbini"];
  const sortOptions = [
    { value: "popularity", label: "Most Popular" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "reviews", label: "Most Reviews" }
  ];

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !location || location === "All Locations" || 
                           hotel.location.toLowerCase().includes(location.toLowerCase());
    const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
    const matchesRating = !minRating || minRating === "any" || hotel.rating >= parseFloat(minRating);
    
    return matchesSearch && matchesLocation && matchesPrice && matchesRating;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Hotels</h1>
          <p className="text-xl opacity-90">Discover the perfect place to stay from our curated collection</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Filters</h2>
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search Hotels</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Hotel name or area..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Price Range (per night)</label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={50000}
                      step={500}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Rs. {priceRange[0].toLocaleString()}</span>
                      <span>Rs. {priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Minimum Rating */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Minimum Rating</label>
                    <Select value={minRating} onValueChange={setMinRating}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any rating</SelectItem>
                        <SelectItem value="4.0">4.0+ stars</SelectItem>
                        <SelectItem value="4.5">4.5+ stars</SelectItem>
                        <SelectItem value="4.8">4.8+ stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters */}
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSearchTerm("");
                      setLocation("");
                      setPriceRange([0, 50000]);
                      setMinRating("any");
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Sort and Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold">
                  {filteredHotels.length} Hotels Found
                </h2>
                <p className="text-muted-foreground">
                  Best deals for your perfect stay
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Hotels Grid */}
            {filteredHotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} {...hotel} />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <div className="space-y-4">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3 className="text-xl font-semibold">No hotels found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button variant="outline" onClick={() => {
                    setSearchTerm("");
                    setLocation("");
                    setPriceRange([0, 50000]);
                    setMinRating("any");
                  }}>
                    Clear All Filters
                  </Button>
                </div>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Hotels;