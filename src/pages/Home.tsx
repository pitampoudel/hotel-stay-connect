import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SearchBox from "@/components/ui/SearchBox";
import HotelCard from "@/components/ui/HotelCard";
import { Star, Award, Shield, Clock } from "lucide-react";
import heroImage from "@/assets/hero-hotel.jpg";
import hotelRoom1 from "@/assets/hotel-room-1.jpg";
import hotelRoom2 from "@/assets/hotel-room-2.jpg";
import hotelRoom3 from "@/assets/hotel-room-3.jpg";

const Home = () => {
  // Sample hotel data
  const featuredHotels = [
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
    }
  ];

  const features = [
    {
      icon: Star,
      title: "Best Price Guarantee",
      description: "Find a lower price elsewhere? We'll match it and give you 10% off your next booking."
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "All hotels are personally verified by our team to ensure the highest standards."
    },
    {
      icon: Shield,
      title: "Secure Booking",
      description: "Your personal and payment information is always protected with bank-level security."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Our customer support team is available round the clock to assist you."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Hotel Stay
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-slide-up">
            Discover amazing hotels across Nepal with the best prices and instant booking
          </p>
          <div className="animate-slide-up">
            <SearchBox />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose HotelBook?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make hotel booking simple, secure, and affordable for everyone
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-medium transition-all duration-300 hover:scale-105 bg-card"
              >
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Hotels</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked hotels offering exceptional experiences at great value
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel.id} {...hotel} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/hotels">
              <Button variant="hero" size="lg">
                View All Hotels
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Book Your Next Stay?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust HotelBook for their accommodation needs
          </p>
          <div className="space-x-4">
            <Link to="/hotels">
              <Button variant="secondary" size="lg">
                Browse Hotels
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;