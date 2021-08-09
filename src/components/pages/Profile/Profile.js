import React from 'react';
import FrontSection from './front';
import { homeObjOne, homeObjThree} from './Data';


function Profile() {
  return (
    <div>
      <FrontSection {...homeObjOne} />
      <FrontSection {...homeObjThree} />
    </div>
  );
}

export default Profile;
