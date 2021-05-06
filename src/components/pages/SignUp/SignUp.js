import React from 'react';
import FrontSection from './front';
import { homeObjOne, homeObjThree, } from './Data';


function SignUp() {
  return (
    <>
      <FrontSection {...homeObjOne} />
      <FrontSection {...homeObjThree} />
    </>
  );
}

export default SignUp;
