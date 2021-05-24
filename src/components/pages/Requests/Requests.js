import React from 'react';
import FrontSection from './front';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';


function Requests() {
  return (
    <>
      <FrontSection {...homeObjOne} />
      <FrontSection {...homeObjTwo} />
    </>
  );
}

export default Requests;
