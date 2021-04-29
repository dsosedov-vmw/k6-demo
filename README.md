- Call the fast endpoint once:
    ```bash
    k6 run src/test/resources/k6/demo-1.js
    ```
- Call the slow endpoint once:
    ```bash
    k6 run src/test/resources/k6/demo-2.js
    ```
- Call the random endpoint once:
    ```bash
    k6 run src/test/resources/k6/demo-3.js
    ```
- Call the fast endpoint with 10 VUs for 30 seconds:
    ```bash
    k6 run src/test/resources/k6/demo-1.js --vus=10 --duration=30s
    ```
- Call the slow endpoint with 10 VUs for 30 seconds:
    ```bash
    k6 run src/test/resources/k6/demo-2.js --vus=10 --duration=30s
    ```
- Call the random endpoint with 10 VUs for 30 seconds:
    ```bash
    k6 run src/test/resources/k6/demo-3.js --vus=10 --duration=30s
    ```
- Call the random endpoint with 10 VUs for 30 seconds once a second per VU:
    ```bash
    k6 run src/test/resources/k6/demo-4.js --vus=10 --duration=30s
    ```
- Same as above but configured within the file:
    ```bash
    k6 run src/test/resources/k6/demo-5.js
    ```
- Same as above but split up into stages:
    ```bash
    k6 run src/test/resources/k6/demo-6.js
    ```
- Same as above but split up into thresholds:
    ```bash
    k6 run src/test/resources/k6/demo-7.js
    ```
- Check the response:
    ```bash
    k6 run src/test/resources/k6/demo-8.js
    ```
- Show groups:
    ```bash
    k6 run src/test/resources/k6/demo-9.js
    ```
- Show JSON output:
    ```bash
    k6 run src/test/resources/k6/demo-1.js --out json=output.json
    ```
- Show test recording and k6 Cloud
