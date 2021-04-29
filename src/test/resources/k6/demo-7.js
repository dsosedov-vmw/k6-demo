import http from 'k6/http';

export const options = {
  stages: [
    { target: 10, duration: '10s' },
    { target: 100, duration: '10s' },
    { target: 0, duration: '10s' },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<5000'], // 95% of requests should be below 5s
  },
}

export default function () {
  http.get('https://k6-demo-api.apps.pcfone.io/random');
}
