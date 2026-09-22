import http from 'k6/http';

export const options = {
  vus: 20,
  duration: '20s',
};

export default function () {
  http.post('http://localhost:3000/cart/add', null, { tags: { name: 'cart' } });
  http.get('http://localhost:3000/report', { tags: { name: 'report' } });
  http.post('http://localhost:3000/pay', null, { tags: { name: 'pay' } });
}