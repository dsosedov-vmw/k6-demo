## k6 demo

### Prerequisites
We will use `src/test/resources/k6/test.js` with the following stub:
```javascript
// 1. init code

export function setup() {
    // 2. setup code

}

export default function (data) {
    // 3. VU code

}

export function teardown(data) {
    // 4. teardown code

}

```
and will be calling it as follows:
```bash
k6 run src/test/resources/k6/test.js
```

### Call the "fast" endpoint once
```javascript
// 1. init code
import http from 'k6/http';

export function setup() {
  // 2. setup code

}

export default function (data) {
  // 3. VU code
  http.get('https://k6-demo-api.apps.pcfone.io/fast');
}

export function teardown(data) {
  // 4. teardown code

}

```

### Call the "slow" endpoint once
```javascript
// 1. init code
import http from 'k6/http';

export function setup() {
  // 2. setup code

}

export default function (data) {
  // 3. VU code
  http.get('https://k6-demo-api.apps.pcfone.io/slow');
}

export function teardown(data) {
  // 4. teardown code

}

```

### Call the "random" endpoint once
```javascript
// 1. init code
import http from 'k6/http';

export function setup() {
  // 2. setup code

}

export default function (data) {
  // 3. VU code
  http.get('https://k6-demo-api.apps.pcfone.io/random');
}

export function teardown(data) {
  // 4. teardown code

}

```

### Add more load to the test
Specify the number of VUs and duration:
```bash
k6 run src/test/resources/k6/test.js --vus=10 --duration=30s
```
Specify the number of VUs and iterations:
```bash
k6 run src/test/resources/k6/test.js --vus=10 --iterations=100
```

### Add options to the test file
```javascript
// 1. init code
import http from 'k6/http';

export const options = {
    vus: 10,
    duration: '30s',
}

export function setup() {
    // 2. setup code

}

export default function (data) {
    // 3. VU code
    http.get('https://k6-demo-api.apps.pcfone.io/random');
}

export function teardown(data) {
    // 4. teardown code

}

```

### Add options to the test file
```javascript
// 1. init code
import http from 'k6/http';

export const options = {
    stages: [
        { target: 10, duration: '10s' },
        { target: 100, duration: '10s' },
        { target: 0, duration: '10s' },
    ],
}

export function setup() {
    // 2. setup code

}

export default function (data) {
    // 3. VU code
    http.get('https://k6-demo-api.apps.pcfone.io/random');
}

export function teardown(data) {
    // 4. teardown code

}

```

### Add thresholds
```javascript
// 1. init code
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

export function setup() {
    // 2. setup code

}

export default function (data) {
    // 3. VU code
    http.get('https://k6-demo-api.apps.pcfone.io/random');
}

export function teardown(data) {
    // 4. teardown code

}

```
Let's change it, so the error goes away:
```javascript
// 1. init code
import http from 'k6/http';

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

}

export default function (data) {
  // 3. VU code
  http.get('https://k6-demo-api.apps.pcfone.io/random');
}

export function teardown(data) {
  // 4. teardown code

}

```

### Add checks
```javascript
// 1. init code
import http from 'k6/http';
import { check } from 'k6'

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

}

export default function (data) {
    // 3. VU code
    let res = http.get('https://k6-demo-api.apps.pcfone.io/random');
    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains the right data': (r) => {
            let data = JSON.parse(r.body)
            return data["foo"] == "bar1";
        },
    });
}

export function teardown(data) {
    // 4. teardown code

}

```
Let's fix the issue:
```javascript
// 1. init code
import http from 'k6/http';
import { check } from 'k6'

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

}

export default function (data) {
    // 3. VU code
    let res = http.get('https://k6-demo-api.apps.pcfone.io/random');
    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains the right data': (r) => {
            let data = JSON.parse(r.body)
            return data["foo"] == "bar";
        },
    });
}

export function teardown(data) {
    // 4. teardown code

}

```

### Add a custom metric
```javascript
// 1. init code
import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check } from 'k6'

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

}

export default function (data) {
    // 3. VU code
    let res = http.get('https://k6-demo-api.apps.pcfone.io/random');
    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains the right data': (r) => {
            let data = JSON.parse(r.body)
            return data["foo"] == "bar";
        },
    });
    negativeCounter.add(-1);
}

export function teardown(data) {
    // 4. teardown code

}

```

### Setup and teardown
```javascript
// 1. init code
import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check } from 'k6'

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
    let res = http.get('https://k6-demo-api.apps.pcfone.io/random');
    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains the right data': (r) => {
            let data = JSON.parse(r.body)
            return data["foo"] == "bar";
        },
    });
    negativeCounter.add(-1);
}

export function teardown(data) {
    // 4. teardown code
    negativeCounter.add(100);
}

```

### Groups and tags
```javascript
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
        let res = http.get('https://k6-demo-api.apps.pcfone.io/fast');
        check(res, {
            'status is not 500': (r) => r.status !== 500,
        });
    });
    group('call random', function () {
        let res = http.get('https://k6-demo-api.apps.pcfone.io/random');
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

```

### Environment variables
```javascript
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

```
and run the following:
```bash
BASE_URL=k6-demo-api.apps.pcfone.io k6 run src/test/resources/k6/test.js
```

### Show JSON output
```bash
BASE_URL=k6-demo-api.apps.pcfone.io k6 run src/test/resources/k6/test.js --out json=output.json
```

### Show k6 cloud
