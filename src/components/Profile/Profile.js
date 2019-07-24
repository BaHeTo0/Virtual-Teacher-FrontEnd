import React from 'react'

import ProfilePicture from './ProfilePicture/ProfilePicture'

class Profile extends React.Component {

    state = {
        
    }

    render() {
        return(
            <div className="Profile">
                <ProfilePicture path="./../../static/profilePicture_default.jpg"/>
            </div>
        );
    }

}

export default Profile;