import http from 'k6/http';
export const options = { vus: 20, duration: '15s' };
export default function () {
  http.post('http://localhost:3000/cart/add', null, { tags: { name: 'cart' } });
}