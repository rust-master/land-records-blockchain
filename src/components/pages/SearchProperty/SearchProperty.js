import React from 'react';
import FrontSection from './front';
import { homeObjOne, homeObjThree, } from './Data';


function SearchProperty() {
  return (
    <>

      <FrontSection {...homeObjThree} />
    </>
  );
}

export default SearchProperty;
