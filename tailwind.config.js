/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary_1:"#c7f3f1",
        primary_2:"#8cd9df",
        primary_3:"#50b3ae",
        secondary_1:"#b0c1ff",
        secondary_2:"#5b7fff",
        secondary_3:"#244de4",
        akcent_1:"#cc98f7",
        akcent_2:"#a767db",
        akcent_3:"#7e41af",
        akcent_3:"#7e41af",
        gradient_1:"#97AAF2",
        gradient_2:"#5B7FFF",
        gradient_3:"#7E41AF",
        gradient_4:"#6F2CA5"
      },
      fontFamily: {
        alexandria: ["Alexandria"],
        roboto: ["Roboto"]
      },
    },
  },
  plugins: [],
  
}