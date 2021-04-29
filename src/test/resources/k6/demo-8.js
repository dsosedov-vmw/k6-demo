import http from 'k6/http';
import { check } from 'k6'

export default function () {
  let res = http.get('https://k6-demo-api.apps.pcfone.io/random');
  check(res, {
    'is status 200': (r) => r.status === 200,
    'body contains the right data': (r) => {
      console.log(JSON.stringify(r))
      let data = JSON.parse(r.body)
      return data["foo"] == "bar";
    },
  });
}
