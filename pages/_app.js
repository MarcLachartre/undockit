import React from 'react';
import Head from 'next/head';
import { useEffect } from "react"

import '../src/css/style.scss';
import '../src/css/background.scss';
import '../src/css/spaceship.scss';
import '../src/css/overlay.scss';

export default function App({ Component }) {
    useEffect(() => {
        if("serviceWorker" in navigator) {
          window.addEventListener("load", function () {
           navigator.serviceWorker.register("undock-worker.js").then(
              function (registration) {
                console.log("Service Worker registration successful with scope: ", registration.scope);
              },
              function (err) {
                console.log("Service Worker registration failed: ", err);
              }
            );
          });
        }
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

