import React from 'react';
import FrontSection from './front';
import { homeObjOne, homeObjThree, } from './Data';


function SignUp() {
  return (
    <div>
      <FrontSection {...homeObjOne} />
      <FrontSection {...homeObjThree} />
    </div>
  );
}

export default SignUp;
