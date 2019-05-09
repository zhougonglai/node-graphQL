export const searchParams = query =>
  typeof query === 'object' ? `?${new URLSearchParams(query).toString()}` : '';

const headers = {
  'Content-Type': 'application/json'
};

export const $fetch = {
  get: (url, params) =>
    fetch(`${url}${searchParams(params)}`, {
      headers,
      mode: 'cors'
    }).then(res => res.json()),
  post: (url, data) =>
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      mode: 'cors',
      headers
    }).then(res => res.json())
};
