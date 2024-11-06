import Document, { Html, Head, Main, NextScript } from 'next/document';

const GA_TRACKING_ID = '';
const title = 'Blockchain draw';
const description = 'Blockchain draw.';
const domain = '';
const url = `https://${domain}`;
const socialBannerUrl = '/social_banner.png'; // 1200 x 630 px

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/*Keep the name for icons, just change the img in /icons folder */}
          <link rel="icon" sizes="16x16" href="/icons/favicon-16x16.png" />
          <link rel="icon" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/apple-touch-icon-180x180.png"
          />
          <link
            rel="icon"
            sizes="192x192"
            href="/icons/android-chrome-192x192.png"
          />
          <link
            rel="icon"
            sizes="512x512"
            href="/icons/android-chrome-512x512.png"
          />

          <meta name="title" content={title} />
          <meta name="description" content={description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={url} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={socialBannerUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content={domain} />
          <meta property="twitter:url" content={url} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
          <meta property="twitter:image" content={socialBannerUrl} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${GA_TRACKING_ID}');
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
