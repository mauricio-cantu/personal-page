import localFont from "next/font/local";

export const indieFlower = localFont({
  src: "./IndieFlower-Regular.ttf",
  display: "swap",
  variable: "--font-sign",
});

export const lato = localFont({
  src: [
    {
      path: "./Lato-Regular.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "./Lato-Bold.ttf",
      style: "normal",
      weight: "600",
    },
    {
      path: "./Lato-Black.ttf",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-lato",
});
