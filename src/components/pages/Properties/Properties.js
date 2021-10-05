import React from 'react';
import HeroSection from '../../HeroSection';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import Property from '../../Property';


function Properties() {
  return (
    <div>
      <Property />
      <HeroSection {...homeObjOne} />
      <HeroSection {...homeObjThree} />
    </div>
  );
}

export default Properties;
