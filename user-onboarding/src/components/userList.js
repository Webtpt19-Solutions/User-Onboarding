import React from 'react';
import UserCard from './userCard.js';

const UserList = ({userList}) => {

    return (
        <div>
            {userList.map(user => {
                return <UserCard key={user.id} user={user}/>
            })}
        </div>
    )
};

export default UserList;