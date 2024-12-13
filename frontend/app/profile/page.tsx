'use client' 
import Head from 'next/head';
import { useEffect, useState } from 'react';

const ComingSoon = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap" rel="stylesheet" />
      </Head>
      <div id="main">
        <h2>Your Profile is Coming Soon!</h2>
        <div id="progress">
          <div id="fill">
            <div id="barpercent">
              <h3>37%</h3>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: "Roboto", sans-serif;
          width: 100%;
          height: 100%;
          text-align: center;
          display: table;
          opacity: ${mounted ? 1 : 0};
          animation: ${mounted ? 'fadein 3s forwards' : 'none'};
        }
        html {
          height: 100%;
          cursor: default;
        }
        h2 {
          font-weight: 300;
          margin-bottom: 25px;
        }
        #main {
          vertical-align: middle;
          display: table-cell;
        }
        #progress {
          width: 45%;
          margin: 0 auto;
          border-radius: 10px;
          background-color: #a8a8a8;
          padding: 7px 5px;
        }
        #fill {
          padding: 2px 0;
          background-color: #00b98b;
          width: 35%;
          border-radius: 25px;
          animation: ${mounted ? 'proanimate 2s' : 'none'};
        }
        #barpercent h3 {
          color: white;
          margin: 0;
          padding: 0;
          opacity: ${mounted ? 1 : 0};
          animation: ${mounted ? 'fadein 3s forwards' : 'none'};
        }
        @keyframes fadein {
          from { opacity: 0; }
        }
        @keyframes proanimate {
          from { width: 0%; }
        }
        @media screen and (max-width:600px) {
          img {
            width: 60%;
          }
          h1 {
            font-size: 1.3em;
          }
          h2 {
            margin: 1.1em;
            font-size: 1.1em;
          }
          #progress {
            width: 80%;
          }
        }
      `}</style>
    </>
  );
};

export default ComingSoon;
