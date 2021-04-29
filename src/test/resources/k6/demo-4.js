import http from 'k6/http';
import { sleep } from 'k6'

export default function () {
  http.get('https://k6-demo-api.apps.pcfone.io/random');
  sleep(1);
}
