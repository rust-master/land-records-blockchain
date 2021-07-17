import React from 'react';
import FrontSection from './front';
import {homeObjThree, } from './Data';


function ChangeMarketValue() {
  return (
    <div>

      <FrontSection {...homeObjThree} />
    </div>
  );
}

export default ChangeMarketValue;
