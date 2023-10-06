import { useEffect, useState } from 'react';

// 포춘쿠키내용 랜덤 표출
const getRandomCookieKey = () => {
  const cookieLen = 15;
  const randomNum = Math.floor(Math.random() * cookieLen);
  return `cookie_${randomNum + 1}`;
};

export const useCookie = () => {
  const [cookieKey, setCookieKey] = useState('');

  useEffect(() => {
    const randemCookieKey = getRandomCookieKey();
    setTimeout(() => {
      setCookieKey(randemCookieKey);
    }, 2000);
  }, []);

  return {
    cookieKey,
  };
};
