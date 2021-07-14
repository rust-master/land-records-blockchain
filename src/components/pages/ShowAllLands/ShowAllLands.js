import React from 'react';
import FrontSection from './front';
import { homeObjOne, homeObjThree, } from './Data';


function ShowAllLands() {
  return (
    <div>

      <FrontSection {...homeObjThree} />
    </div>
  );
}

export default ShowAllLands;
