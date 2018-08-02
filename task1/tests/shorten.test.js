const shorten = require("../src/shorten");

let shortenAndLog = url => {
  const shortcode = shorten.shorten(url);
  console.log('shorten("' + url + '") => ' + shortcode);
  return shortcode;
};

const shortcodePattern = /^[0-9a-zA-Z]{6}$/;

test("shortening a URL should return a correct-looking shortcode", () => {
  /**
   *  We'll check if the return from the function is a
   * string that contains the expected characters, and is
   * of the correct length.
   */
  const shortcode = shortenAndLog("https://www.hackkar.com");
  expect(shortcode).toMatch(shortcodePattern);
});

test("different URLs should yield different shortcodes", () => {
  const shortenedPathA = shortenAndLog("https://www.google.com/a");
  const shortenedPathB = shortenAndLog("https://www.google.com/b");
  const shortenedSubdomainA = shortenAndLog("https://a.ycombinator.com");
  const shortenedSubdomainB = shortenAndLog("https://b.ycombinator.com");

  expect(shortenedPathA).toMatch(shortcodePattern);
  expect(shortenedPathB).toMatch(shortcodePattern);
  expect(shortenedSubdomainA).toMatch(shortcodePattern);
  expect(shortenedSubdomainB).toMatch(shortcodePattern);

  /**
   * The function should generate different shortcodes for
   * URLs that are slightly different.
   */
  expect(shortenedPathA).not.toEqual(shortenedPathB);
  expect(shortenedSubdomainA).not.toEqual(shortenedSubdomainB);
});

test("shortening a URL twice should return same shortcode", () => {
  const firstShortcode = shortenAndLog("https://news.ycombinator.com");
  const secondShortcode = shortenAndLog("https://news.ycombinator.com");

  expect(firstShortcode).toMatch(shortcodePattern);

  /**
   * Repeated calls of the URL should yield the same
   * shortcode. This allows reuse of the code if a
   * previously shortened URL is requested again.
   */
  expect(firstShortcode).toEqual(secondShortcode);
});
