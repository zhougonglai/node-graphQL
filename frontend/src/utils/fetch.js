import Cookies from 'js-cookie';

export const searchParams = query =>
  typeof query === 'object' ? `?${new URLSearchParams(query).toString()}` : '';

const getHeaders = () => {
  const token = Cookies.get('token');
  return token
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    : { 'Content-Type': 'application/json' };
};

export const $fetch = {
  get: (url, params) =>
    fetch(`${url}${searchParams(params)}`, {
      headers: getHeaders(),
      mode: 'cors'
    }).then(res => res.json()),
  post: (url, data) =>
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      mode: 'cors',
      headers: getHeaders()
    }).then(res => res.json())
};
