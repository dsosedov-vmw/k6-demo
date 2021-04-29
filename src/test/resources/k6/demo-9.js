import http from 'k6/http';
import { group } from 'k6'

export default function () {
  group('hit fast', () => {
    http.get('https://k6-demo-api.apps.pcfone.io/fast');
  })

  group('hit slow', () => {
    http.get('https://k6-demo-api.apps.pcfone.io/slow');
  })

  group('hit random', () => {
    http.get('https://k6-demo-api.apps.pcfone.io/random');
  })
}
