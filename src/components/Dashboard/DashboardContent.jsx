import {
  Announcement,
  Broadcasts,
  Calendar,
  // CommunityNews,
  Feasts,
  ImageGallery,
  Links,
  // Obituaries,
  Resources,
  UploadFile,
} from "./DashboardIcons";

export const DashboardContnet = [
  {
    item: "Announcement",
    slug: "/announcement",
    svg: Announcement,
  },
  {
    item: "Live Streams",
    slug: "/broadcasts",
    svg: Broadcasts,
  },
  {
    item: "Videos",
    slug: "/videos",
    svg: Broadcasts,
  },
  {
    item: "Feasts",
    slug: "/feasts",
    svg: Feasts,
  },
  {
    item: "Calendar",
    slug: "/calendar",
    svg: Calendar,
  },
  // {
  //   item: "Community News",
  //   slug: "/community-news",
  //   svg: CommunityNews,
  // },
  // {
  //   item: "Obituaries",
  //   slug: "/obituaries",
  //   svg: Obituaries,
  // },
  {
    item: "Useful Links",
    slug: "/useful-links",
    svg: Links,
  },
  {
    item: "Resources",
    slug: "/resources",
    svg: Resources,
  },
  {
    item: "Upload Pdf",
    slug: "/upload-pdf",
    svg: UploadFile,
  },
  {
    item: "Image Gallery",
    slug: "/image-gallery",
    svg: ImageGallery,
  },
];
