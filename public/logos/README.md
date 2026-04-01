# Client Logos

Place grayscale SVG logos here for the trust strip on the homepage.

Naming convention:
  kaufland.svg
  metro-group.svg
  lidl.svg
  speedy.svg
  bulpharma.svg
  fibank.svg

Then update app/page.tsx — find the "Trust strip" section and replace
the <span className="logo-pill"> elements with:

  <img
    src="/logos/kaufland.svg"
    alt="Kaufland"
    height="24"
    className="opacity-50 hover:opacity-80 transition-opacity grayscale"
  />

Get official SVG logos from each brand's press/media kit page.
