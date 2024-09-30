import { HomeIcon, InfoIcon, ListIcon, CalendarIcon, MessageSquareIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import About from "./pages/About.jsx";
import Amenities from "./pages/Amenities.jsx";
import Booking from "./pages/Booking.jsx";
import GuestInputs from "./pages/GuestInputs.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "About Us",
    to: "/about",
    icon: <InfoIcon className="h-4 w-4" />,
    page: <About />,
  },
  {
    title: "Amenities",
    to: "/amenities",
    icon: <ListIcon className="h-4 w-4" />,
    page: <Amenities />,
  },
  {
    title: "Booking",
    to: "/booking",
    icon: <CalendarIcon className="h-4 w-4" />,
    page: <Booking />,
  },
  {
    title: "Guest Inputs",
    to: "/guest-inputs",
    icon: <MessageSquareIcon className="h-4 w-4" />,
    page: <GuestInputs />,
  },
];
