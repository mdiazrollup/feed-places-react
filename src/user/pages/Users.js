import React, { useEffect, useState } from 'react';
import UserList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const fetchUsers = (async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/'
        );

        setLoadedUsers(responseData.users);
      } catch (err) {
        console.log(err);
      }
    })();
    // or
    // fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
