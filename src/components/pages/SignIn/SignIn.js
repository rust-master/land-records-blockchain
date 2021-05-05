import React from 'react';
import FrontSection from './front';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';


function SignIn() {
  return (
    <>
      <FrontSection {...homeObjOne} />
      <FrontSection {...homeObjThree} />
    </>
  );
}

export default SignIn;
