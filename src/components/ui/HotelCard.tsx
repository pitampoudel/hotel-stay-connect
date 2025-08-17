import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Wifi, Car, Coffee, Waves } from "lucide-react";

interface HotelCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  amenities: string[];
  description: string;
}

const HotelCard = ({
  id,
  name,
  location,
  rating,
  reviews,
  price,
  image,
  amenities,
  description,
}: HotelCardProps) => {
  const amenityIcons: { [key: string]: any } = {
    wifi: Wifi,
    parking: Car,
    restaurant: Coffee,
    pool: Waves,
  };

  return (
    <Card className="overflow-hidden hover:shadow-strong transition-all duration-300 hover:scale-[1.02] group">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-accent text-accent-foreground font-semibold">
            Featured
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm font-medium">
            Rs. {price.toLocaleString()} / night
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {name}
              </h3>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-secondary text-secondary" />
                <span className="font-semibold text-sm">{rating}</span>
                <span className="text-muted-foreground text-sm">({reviews})</span>
              </div>
            </div>
            
            <div className="flex items-center text-muted-foreground mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2">
            {amenities.slice(0, 4).map((amenity) => {
              const IconComponent = amenityIcons[amenity.toLowerCase()] || Coffee;
              return (
                <div key={amenity} className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <IconComponent className="h-3 w-3" />
                  <span className="capitalize">{amenity}</span>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Starting from</p>
              <p className="text-2xl font-bold text-primary">
                Rs. {price.toLocaleString()}
                <span className="text-sm text-muted-foreground font-normal"> / night</span>
              </p>
            </div>
            
            <div className="space-x-2">
              <Link to={`/hotels/${id}`}>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Link>
              <Link to={`/hotels/${id}/book`}>
                <Button variant="hero" size="sm">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelCard;