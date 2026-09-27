# Jev Cada Desk

    **Triage French public-document requests against sourced CADA precedents with mandatory human review.**

    [![Tests](https://github.com/gbesse/jev-cada-desk/actions/workflows/test.yml/badge.svg)](https://github.com/gbesse/jev-cada-desk/actions/workflows/test.yml) [MIT](LICENSE) · Node.js 22+ · Public alpha

    ## Try it

    ```sh
    git clone https://github.com/gbesse/jev-cada-desk.git
    cd jev-cada-desk
    npm install
    npm run demo
    ```

    The demo uses synthetic records and fixture probabilities. It makes no network call and makes no claim about measured Jev quality.

    ## Use the library

    Import the domain functions from `@gbesse/jev-cada-desk` and provide either `createJevClient()` from the `./jev` export or the offline `createFakeProvider()` test double. The complete runnable path is in `examples/demo.mjs`.

    ## Decision boundary

    The package validates provenance and dates, then asks Jev for a bounded analogy to one supplied precedent. Every output is marked for review and explicitly carries legalAdvice: false.

    ## Data provenance

    The CADA publishes its opinions and advice as open data. The official dataset says that all opinions from late 2012 onward are included and that newer anonymized files are added over time.

    Official references:

    - [https://www.data.gouv.fr/datasets/avis-et-conseils-de-la-cada](https://www.data.gouv.fr/datasets/avis-et-conseils-de-la-cada)
- [https://www.cada.fr/rechercher-un-avis](https://www.cada.fr/rechercher-un-avis)

    Keep upstream attribution, source URLs, retrieval dates and original identifiers with every derived record.

    ## Real Jev requests

    Real requests are opt-in, paid, and sent to `https://api.typesafe.ai/v1/systemone`. The client pins `jev-1.13.0`, validates the returned model and all probabilities, rejects redirects, retries only network failures plus HTTP 429/529, and refuses state above a conservative 24,000-token estimate.

    ```sh
    TYPESAFE_API_KEY=... node scripts/live-smoke.mjs
    ```

    Never send personal data, secrets, or full unredacted case files. Evaluate representative French labels before operational use.

    ## Validation

    `npm run validate` runs syntax checks, strict public-type checks, tests, and the offline demo on Node.js 22 and 24 in CI.

    Independent project; not affiliated with TypeSafe AI or the French administration. See the [Jev API documentation](https://docs.typesafe.ai/api) and [model limitations](https://docs.typesafe.ai/model-jaggedness/jev-1.13).
