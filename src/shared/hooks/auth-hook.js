import { useCallback, useEffect, useState } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);

  const login = useCallback((userId, token, expirationDate) => {
    setToken(token);
    setUserId(userId);
    const expDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      'userData',
      JSON.stringify({ userId, token, expiration: expDate.toISOString() })
    );
    setTokenExpirationDate(expDate);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, token, tokenExpirationDate]);

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem('userData'));
    if (
      storeData &&
      storeData.token &&
      new Date(storeData.expiration) > new Date()
    ) {
      login(storeData.userId, storeData.token, new Date(storeData.expiration));
    }
  }, [login]);

  return { token, login, logout, userId };
};
