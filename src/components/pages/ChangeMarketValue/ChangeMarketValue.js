import React from 'react';
import FrontSection from './front';
import { homeObjOne, homeObjThree, } from './Data';


function ChangeMarketValue() {
  return (
    <div>

      <FrontSection {...homeObjThree} />
    </div>
  );
}

export default ChangeMarketValue;
