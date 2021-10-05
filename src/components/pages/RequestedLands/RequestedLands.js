import React from 'react';
import FrontSection from './front';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';


function RequestedLands() {
  return (
    <div>
      <FrontSection {...homeObjOne} />
      <FrontSection {...homeObjTwo} />
    </div>
  );
}

export default RequestedLands;
