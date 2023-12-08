// 1. init code
import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check, group } from 'k6'

let negativeCounter = new Counter('negative_count');

export const options = {
    stages: [
        { target: 10, duration: '10s' },
        { target: 100, duration: '10s' },
        { target: 0, duration: '10s' },
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<6000'], // 95% of requests should be below 5s
    },
}

export function setup() {
    // 2. setup code
    negativeCounter.add(100);
}

export default function (data) {
    // 3. VU code
    group('call fast', function () {
        let res = http.get(`https://${__ENV.BASE_URL}/fast`);
        check(res, {
            'status is not 500': (r) => r.status !== 500,
        });
    });
    group('call random', function () {
        let res = http.get(`https://${__ENV.BASE_URL}/random`);
        check(res, {
            'status is 200': (r) => r.status === 200,
            'body contains the right data': (r) => {
                let data = JSON.parse(r.body)
                return data["foo"] == "bar";
            },
        });
    });
    negativeCounter.add(-1);
}

export function teardown(data) {
    // 4. teardown code
    negativeCounter.add(100);
}
