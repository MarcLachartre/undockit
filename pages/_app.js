import React from 'react';
import Head from 'next/head';

import '../src/css/style.scss';
import '../src/css/background.scss';
import '../src/css/spaceship.scss';
import '../src/css/overlay.scss';

export default function App({ Component }) {
    return (
        <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Component />
        </>
    )
}