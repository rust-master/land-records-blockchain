import React from "react";
import HeroSection from "../../HeroSection";
import { homeObjTwo, homeObjThree, homeObjFour } from "./Data";
import CardView from "../Comps/CardsView";
import InheritanceCalaculator from "../InheritanceCalculator/InheritanceCalculator";

function Home() {
  return (
    <div>
      <CardView />
      <InheritanceCalaculator />
      <HeroSection {...homeObjThree} />
      <HeroSection {...homeObjTwo} />
      <HeroSection {...homeObjFour} />
    </div>
  );
}

export default Home;
