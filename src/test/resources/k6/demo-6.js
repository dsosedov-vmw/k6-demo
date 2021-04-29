import http from 'k6/http';

export const options = {
  stages: [
    { target: 10, duration: '10s' },
    { target: 100, duration: '10s' },
    { target: 0, duration: '10s' },
  ],
}

export default function () {
  http.get('https://k6-demo-api.apps.pcfone.io/random');
}
