import React from 'react';

const UserCard = ({user}) => {

    return (
        <div>
            <h2>{user.name}</h2>
            <h4>{user.email}</h4>
        </div>
    )
};

export default UserCard;