import React from 'react';
import UserList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Maria',
      image: 'https://aplustudents.com/images/user1.png',
      places: 3,
    },
  ];
  return <UserList items={USERS} />;
};

export default Users;
