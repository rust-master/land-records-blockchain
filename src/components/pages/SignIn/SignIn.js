import React from 'react';
import FrontSection from './front';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';


function SignIn() {
  return (
    <div>
      <FrontSection {...homeObjOne} />
      <FrontSection {...homeObjThree} />
    </div>
  );
}

export default SignIn;
