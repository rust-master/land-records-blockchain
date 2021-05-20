import React from 'react';
import FrontSection from './front';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';


function GovtLogin() {
  return (
    <>
      <FrontSection {...homeObjOne} />
      <FrontSection {...homeObjThree} />
    </>
  );
}

export default GovtLogin;
