import React from 'react';

const ProfilePicture = (props) => {
    return(
        <div className="ProfilePicture">
            <img src={props.path} alt="profile"/>
        </div>
    );
}

export default ProfilePicture