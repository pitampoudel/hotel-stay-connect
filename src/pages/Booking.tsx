import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Calendar as CalendarIcon, CreditCard, Users, Clock, MapPin, Star } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";
import hotelRoom1 from "@/assets/hotel-room-1.jpg";

const Booking = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("room") || "deluxe";
  
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const [rooms, setRooms] = useState("1");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Sample hotel and room data
  const hotel = {
    id: "1",
    name: "Grand Himalaya Hotel",
    location: "Thamel, Kathmandu",
    rating: 4.8,
    reviews: 1248,
    image: hotelRoom1,
  };

  const roomTypes = {
    deluxe: { name: "Deluxe Room", price: 8500 },
    suite: { name: "Executive Suite", price: 15000 },
    standard: { name: "Standard Room", price: 6500 },
  };

  const selectedRoom = roomTypes[roomId as keyof typeof roomTypes] || roomTypes.deluxe;
  
  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 1;
  const roomPrice = selectedRoom.price * parseInt(rooms) * nights;
  const taxAmount = roomPrice * 0.13; // 13% VAT
  const serviceCharge = roomPrice * 0.10; // 10% service charge
  const totalAmount = roomPrice + taxAmount + serviceCharge;

  const handleBooking = () => {
    if (!checkIn || !checkOut || !firstName || !lastName || !email || !phone || !agreeTerms) {
      alert("Please fill in all required fields and accept terms and conditions");
      return;
    }
    
    // In real app, this would make API call to create booking
    console.log("Booking details:", {
      hotel: hotel.id,
      room: roomId,
      checkIn,
      checkOut,
      guests,
      rooms,
      firstName,
      lastName,
      email,
      phone,
      specialRequests,
      totalAmount
    });
    
    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Complete Your Booking</h1>
          <p className="text-lg opacity-90">Secure your perfect stay in just a few steps</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hotel Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-1">{hotel.name}</h2>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="font-semibold text-sm">{hotel.rating}</span>
                      <span className="text-muted-foreground text-sm">({hotel.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{selectedRoom.name}</div>
                    <div className="text-muted-foreground">Rs. {selectedRoom.price.toLocaleString()}/night</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Details */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Check-in Date */}
                  <div className="space-y-2">
                    <Label htmlFor="checkin">Check-in Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkIn && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkIn ? format(checkIn, "PPP") : "Select check-in date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkIn}
                          onSelect={setCheckIn}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Check-out Date */}
                  <div className="space-y-2">
                    <Label htmlFor="checkout">Check-out Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkOut && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOut ? format(checkOut, "PPP") : "Select check-out date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkOut}
                          onSelect={setCheckOut}
                          disabled={(date) => date <= (checkIn || new Date())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Guests */}
                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests *</Label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} Guest{num > 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rooms */}
                  <div className="space-y-2">
                    <Label htmlFor="rooms">Number of Rooms *</Label>
                    <Select value={rooms} onValueChange={setRooms}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} Room{num > 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guest Information */}
            <Card>
              <CardHeader>
                <CardTitle>Guest Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter first name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter last name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requests">Special Requests (Optional)</Label>
                  <Textarea
                    id="requests"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any special requests or preferences..."
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a> *
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="shadow-strong">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {checkIn && checkOut && (
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Check-in:</span>
                        <span className="font-medium">{format(checkIn, "MMM dd, yyyy")}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Check-out:</span>
                        <span className="font-medium">{format(checkOut, "MMM dd, yyyy")}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{nights} night{nights > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Room:</span>
                      <span className="font-medium">{selectedRoom.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Guests:</span>
                      <span className="font-medium">{guests} guest{parseInt(guests) > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Rooms:</span>
                      <span className="font-medium">{rooms} room{parseInt(rooms) > 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Room charges ({nights} nights)</span>
                      <span>Rs. {roomPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Service charge (10%)</span>
                      <span>Rs. {serviceCharge.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>VAT (13%)</span>
                      <span>Rs. {taxAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-primary">Rs. {totalAmount.toLocaleString()}</span>
                  </div>

                  <Button 
                    onClick={handleBooking}
                    variant="hero" 
                    className="w-full mt-6"
                    size="lg"
                  >
                    Proceed to Payment
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Secure payment powered by eSewa • Free cancellation within 24 hours
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Dialog */}
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Booking Confirmed!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Your booking has been successfully confirmed. You will receive a confirmation email shortly.
              <br /><br />
              <strong>Booking Reference:</strong> HTB{Date.now().toString().slice(-6)}
              <br />
              <strong>Total Amount:</strong> Rs. {totalAmount.toLocaleString()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="justify-center">
            <AlertDialogAction onClick={() => setShowConfirmation(false)}>
              View My Bookings
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Booking;