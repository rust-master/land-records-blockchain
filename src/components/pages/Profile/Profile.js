import React from 'react';
import FrontSection from './front';
import { homeObjOne} from './Data';


function Profile() {
  return (
    <div>
      <FrontSection {...homeObjOne} />
    </div>
  );
}

export default Profile;
