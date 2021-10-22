import React from "react";
import HeroSection from "../../HeroSection";
import { homeObjFour } from "./Data";
import CardView from "../Comps/CardsView";
import InheritanceCalaculator from "../InheritanceCalculator/InheritanceCalculator";
import AboutUs from "../AboutUs/AboutUs";

function Home() {
  return (
    <div>
      <CardView />
      <InheritanceCalaculator />
      <HeroSection {...homeObjFour} />
      <AboutUs />
    </div>
  );
}

export default Home;
