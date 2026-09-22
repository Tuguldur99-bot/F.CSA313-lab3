import http from 'k6/http';
export const options = { vus: 20, duration: '15s' };
export default function () {
  http.get('http://localhost:3000/report', { tags: { name: 'report' } });
}