import {
  BiSearchAlt,
  BiBook,
  BiFirstAid,
  BiHealth,
  BiMoney,
  BiHeart,
  BiDotsHorizontalRounded,
  BiRocket,
  BiDonateHeart,
} from "react-icons/bi";
import img1 from "@/assets/education.jpg";
import img2 from "@/assets/emergency.jpg";
import img3 from "@/assets/medical.jpg";
import img4 from "@/assets/monthly-bill.jpg";
import img5 from "@/assets/memorial.jpg";
import img6 from "@/assets/other.jpg";

export const navLinks = [
  {
    title: "Search",
    href: "/search",
    icon: BiSearchAlt,
  },
  {
    title: "Categories",
    href: "/categories",
    children: [
      {
        title: "Education",
        href: "/categories/education",
        description: "Help students and teachers with educational resources.",
        icon: BiBook,
      },
      {
        title: "Emergency",
        href: "/categories/emergency",
        description: "Provide urgent assistance to those in crisis.",
        icon: BiFirstAid,
      },
      {
        title: "Medical",
        href: "/categories/medical",
        description: "Support access to essential healthcare.",
        icon: BiHealth,
      },
      {
        title: "Monthly Bill",
        href: "/categories/monthly-bill",
        description: "Help families cover their monthly expenses.",
        icon: BiMoney,
      },
      {
        title: "Memorial",
        href: "/categories/memorial",
        description: "Support memorial services and expenses.",
        icon: BiHeart,
      },
      {
        title: "Other",
        href: "/categories/other",
        description: "Assist with unique and urgent needs.",
        icon: BiDotsHorizontalRounded,
      },
    ],
  },
  {
    title: "Take Action",
    href: "/take-action",
    children: [
      {
        title: "Start a Fundraiser",
        href: "/fundraiser",
        description: "Raise funds for a meaningful cause.",
        icon: BiRocket,
      },
      {
        title: "Donate",
        href: "/all-fundraisers",
        description: "Support a campaign with your contribution.",
        icon: BiDonateHeart,
      },
    ],
  },
];

export const categoryData = [
  {
    name: "education",
    title: "Explore Fundraisers for Education and Learning",
    image: img1.src,
    subHeading: "Browse educational campaigns",
  },
  {
    name: "emergency",
    title: "Uncover Critical Fundraisers for Urgent Relief",
    image: img2.src,
    subHeading: "Browse emergency campaigns",
  },
  {
    name: "medical",
    title: "Join Fundraisers Focused on Health and Healing",
    image: img3.src,
    subHeading: "Browse medical campaigns",
  },
  {
    name: "monthly-bill",
    title: "Lend a Hand with Monthly Living Expenses",
    image: img4.src,
    subHeading: "Browse monthly bill campaigns",
  },
  {
    name: "memorial",
    title: "Honor Loved Ones with Memorial and Tribute Fundraisers",
    image: img5.src,
    subHeading: "Browse memorial campaigns",
  },
  {
    name: "other",
    title: "Discover Unique and Diverse Fundraising Campaigns",
    image: img6.src,
    subHeading: "Browse other campaigns",
  },
];
