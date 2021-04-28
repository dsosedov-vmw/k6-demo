import http from 'k6/http';

export default function () {
  http.get('https://k6-demo-api.apps.pcfone.io/fast');
}
