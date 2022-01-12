import React from 'react';
import Head from 'next/head';
import { useEffect } from "react"

import '../src/css/style.scss';
import '../src/css/background.scss';
import '../src/css/spaceship.scss';
import '../src/css/overlay.scss';

export default function App({ Component }) {
    useEffect(() => {
    // const worker = new Worker("undock-worker.js")
    //   window.addEventListener("keyup", ()=> {
    //     worker.postMessage("startcount")
    //     worker.addEventListener('message', (event) => {
    //       console.log(`Received message from worker: ${event.data}`)
    //       worker.terminate()
    //   });
    // })
    }, [])
    
    return (
        <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Component />
        </>
    )
}

