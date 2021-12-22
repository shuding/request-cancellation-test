import { useEffect, useState } from 'react'
import Bowser from 'bowser'
import Head from 'next/head'

export default function Main() {
  const [browser, setBrowser] = useState(null)
  const [result, setResult] = useState(null)

  useEffect(() => {
    window.addEventListener(
      'message',
      (event) => {
        if (event.data?.from === 'request-cancellation-test') {
          setResult(event.data)
        }
      },
      false
    )
    setBrowser(Bowser.parse(window.navigator.userAgent))
  }, [])

  return (
    <div className='container'>
      <Head>
        <title>Browser Request Cancellation Test</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <h1>Browser Request Cancellation Test</h1>
      <h2>Current Environment</h2>
      {browser ? (
        <div>
          {browser.browser.name} {browser.browser.version}, {browser.os.name}{' '}
          {browser.os.version}. {browser.platform.type}.
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <h2>Cancellation Error</h2>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <td>Field</td>
              <td>Value</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>.toString()</td>
              <td>{result?.toString}</td>
            </tr>
            <tr>
              <td>.name</td>
              <td>{result?.name}</td>
            </tr>
            <tr>
              <td>.message</td>
              <td>{result?.message}</td>
            </tr>
            <tr>
              <td>.stack</td>
              <td>{result?.stack}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>What Is This?</h2>
      <p>
        This website details the error when a fetch request gets cancelled in
        this browser.
      </p>
      <p>
        Most browsers will cancel ongoing or queued fetch tasks, when unloading
        the document (
        <a
          href='https://html.spec.whatwg.org/multipage/browsing-the-web.html#aborting-a-document-load'
          target='_blank'
        >
          spec
        </a>
        ). It usually happens when navigating away from the current page, which
        causes a fetch error if there is an unfinished request.
      </p>
      <p>
        However, browsers are <b>behaving differently</b> and throwing different
        errors (listed below). It can be really{' '}
        <a
          href='https://stackoverflow.com/questions/55738408/javascript-typeerror-cancelled-error-when-calling-fetch-on-ios'
          target='_blank'
        >
          annoying
        </a>{' '}
        to differentiate them from normal errors if you are using Sentry, or
        showing a “failed to fetch” hint in the UI.
      </p>
      <p>
        If you want to reproduce the error by yourself, make sure you have
        DevTools opened and “Preserve Log” checked, then click{' '}
        <a href='/test'>/test</a>. You will see a failed network request and a
        printed error in the console.
      </p>
      <p>
        You can also find the{' '}
        <a
          href='https://github.com/shuding/request-cancellation-test'
          target='_blank'
        >
          source code
        </a>{' '}
        of this website on GitHub, and join the{' '}
        <a href='https://twitter.com' target='_blank'>
          conversation
        </a>{' '}
        on Twitter.
      </p>
      <h2>Test Results for Common Browsers</h2>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <td>Field</td>
              <td>Chrome 95</td>
              <td>Safari 14</td>
              <td>iOS Safari 14</td>
              <td>Firefox 94</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>.toString()</td>
              <td>TypeError: Failed to fetch</td>
              <td>TypeError: cancelled</td>
              <td>TypeError: cancelled</td>
              <td>
                TypeError: NetworkError when attempting to fetch resource.
              </td>
            </tr>
            <tr>
              <td>.name</td>
              <td>TypeError</td>
              <td>TypeError</td>
              <td>TypeError</td>
              <td>TypeError</td>
            </tr>
            <tr>
              <td>.message</td>
              <td>Failed to fetch</td>
              <td>cancelled</td>
              <td>cancelled</td>
              <td>NetworkError when attempting to fetch resource.</td>
            </tr>
            <tr>
              <td>.stack</td>
              <td>TypeError: Failed to fetch{'\n    '}at ...</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <iframe src='/test' />
    </div>
  )
}
