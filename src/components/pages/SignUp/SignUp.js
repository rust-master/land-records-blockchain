import React from 'react';
import FrontSection from './front';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import Pricing from '../../Pricing';

function SignUp() {
  return (
    <>
      <FrontSection {...homeObjOne} />
      <FrontSection {...homeObjThree} />
    </>
  );
}

export default SignUp;
