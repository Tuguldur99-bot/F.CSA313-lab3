import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 20,
  duration: '1m',
  thresholds: {
    'http_req_duration{name:cart}': ['p(95)<5'],
    'http_req_duration{name:report}': ['p(95)<100'], // deliberately impossible — guaranteed FAIL
    'http_req_failed{name:pay}': ['rate<0.08'],
    checks: ['rate>=0.90'],
  },
};

export default function () {
  const r1 = http.post('http://localhost:3000/cart/add', null, { tags: { name: 'cart' } });
  check(r1, { 'cart: got response': (r) => r.status === 200 });

  const r2 = http.get('http://localhost:3000/report', { tags: { name: 'report' } });
  check(r2, { 'report: got response': (r) => r.status === 200 });

  const r3 = http.post('http://localhost:3000/pay', null, { tags: { name: 'pay' } });
  check(r3, { 'pay: got response': (r) => r.status === 200 || r.status === 500 });
}