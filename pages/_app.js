import React from 'react';
import Head from 'next/head';
import { useEffect } from "react"

import '../src/css/style.scss';
import '../src/css/background.scss';
import '../src/css/spaceship.scss';
import '../src/css/overlay.scss';

export default function App({ Component }) {
    return (
        <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name= 'title' content= 'Undock it'/>
            <meta name= 'description' content= 'Press "start undock procedure" and travel to new horizons!'/>
            <meta name= 'keywords' content= 'Spaceship cargo undocking' />
            <meta property= 'og:title' content= 'Undock it' />
            <meta property= 'og:description' content= 'Press "start undock procedure" and travel to new horizons!' />
            <meta property= 'og:type' content= 'website' />
            <meta property= 'og:url' content= '' />
            <meta property= 'og:image' content= '' />
            <meta name= 'twitter:card' content= 'summary_large_image' />
            <meta name= 'twitter:title' content= 'Undock it' />
            <meta name= 'twitter:description' content= 'Press "start undock procedure" and travel to new horizons!' />
            <meta name= 'twitter:image' content= ''  />
             
        </Head>
        <Component />
        </>
    )
}

