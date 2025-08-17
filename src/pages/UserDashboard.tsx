import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Star, User, CreditCard, Clock, Phone, Mail, Edit } from "lucide-react";
import { format } from "date-fns";
import hotelRoom1 from "@/assets/hotel-room-1.jpg";
import hotelRoom2 from "@/assets/hotel-room-2.jpg";

const UserDashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe", 
    email: "john.doe@email.com",
    phone: "+977-9841234567",
    address: "Kathmandu, Nepal"
  });

  // Sample booking data
  const bookings = [
    {
      id: "HTB123456",
      hotelName: "Grand Himalaya Hotel",
      location: "Thamel, Kathmandu",
      roomType: "Deluxe Room",
      checkIn: new Date("2024-03-15"),
      checkOut: new Date("2024-03-18"),
      guests: 2,
      totalAmount: 25500,
      status: "confirmed",
      image: hotelRoom1,
      rating: 4.8
    },
    {
      id: "HTB123457",
      hotelName: "Royal Palace Resort", 
      location: "Lakeside, Pokhara",
      roomType: "Executive Suite",
      checkIn: new Date("2024-02-10"),
      checkOut: new Date("2024-02-13"),
      guests: 2,
      totalAmount: 36000,
      status: "completed",
      image: hotelRoom2,
      rating: 4.6
    },
    {
      id: "HTB123458",
      hotelName: "Mountain View Lodge",
      location: "Nagarkot, Bhaktapur", 
      roomType: "Standard Room",
      checkIn: new Date("2024-04-20"),
      checkOut: new Date("2024-04-22"),
      guests: 1,
      totalAmount: 19000,
      status: "upcoming",
      image: hotelRoom1,
      rating: 4.7
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-accent text-accent-foreground";
      case "completed": return "bg-muted text-muted-foreground";
      case "upcoming": return "bg-primary text-primary-foreground";
      case "cancelled": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed": return "Confirmed";
      case "completed": return "Completed";
      case "upcoming": return "Upcoming";
      case "cancelled": return "Cancelled";
      default: return status;
    }
  };

  const handleProfileUpdate = () => {
    // TODO: Implement profile update API call
    console.log("Updating profile:", profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-white/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-white/20 text-white text-lg">
                {profile.firstName[0]}{profile.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {profile.firstName}!</h1>
              <p className="text-lg opacity-90">Manage your bookings and profile</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              My Bookings
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment Methods
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Bookings</h2>
              <div className="text-muted-foreground">
                {bookings.length} booking{bookings.length !== 1 ? 's' : ''} found
              </div>
            </div>

            <div className="grid gap-6">
              {bookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden hover:shadow-medium transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {/* Hotel Image */}
                      <div className="md:col-span-1">
                        <img
                          src={booking.image}
                          alt={booking.hotelName}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>

                      {/* Booking Details */}
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{booking.hotelName}</h3>
                            <div className="flex items-center gap-1 text-muted-foreground text-sm">
                              <MapPin className="h-4 w-4" />
                              <span>{booking.location}</span>
                            </div>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusText(booking.status)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Room Type:</span>
                            <div className="font-medium">{booking.roomType}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Guests:</span>
                            <div className="font-medium">{booking.guests} guest{booking.guests > 1 ? 's' : ''}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Check-in:</span>
                            <div className="font-medium">{format(booking.checkIn, "MMM dd, yyyy")}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Check-out:</span>
                            <div className="font-medium">{format(booking.checkOut, "MMM dd, yyyy")}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-secondary text-secondary" />
                            <span className="text-sm font-medium">{booking.rating}</span>
                          </div>
                          <div className="text-muted-foreground text-sm">
                            Booking ID: {booking.id}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="md:col-span-1 flex flex-col justify-between">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            Rs. {booking.totalAmount.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">Total Amount</div>
                        </div>

                        <div className="space-y-2 mt-4">
                          <Button variant="outline" className="w-full" size="sm">
                            View Details
                          </Button>
                          {booking.status === "upcoming" && (
                            <Button variant="destructive" className="w-full" size="sm">
                              Cancel Booking
                            </Button>
                          )}
                          {booking.status === "completed" && (
                            <Button variant="hero" className="w-full" size="sm">
                              Book Again
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Profile Information</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={profile.address}
                      onChange={(e) => setProfile({...profile, address: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-4">
                    <Button onClick={handleProfileUpdate} variant="hero">
                      Save Changes
                    </Button>
                    <Button onClick={() => setIsEditing(false)} variant="outline">
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Payment Methods Added</h3>
                  <p className="text-muted-foreground mb-6">
                    Add your payment methods for faster checkout experience
                  </p>
                  <Button variant="hero">
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;