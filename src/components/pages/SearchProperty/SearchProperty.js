import React from 'react';
import FrontSection from './front';
import { homeObjOne, homeObjThree, } from './Data';


function SearchProperty() {
  return (
    <div>

      <FrontSection {...homeObjThree} />
    </div>
  );
}

export default SearchProperty;
