const request = require("supertest");
const api = require("../src/api");

const shortcodePattern = /^[0-9a-zA-Z]{6}$/;

describe("Creating and retrieving shortcodes", () => {
  test("it should be able to retrieve URL for a previously created shortcode", () => {
    return request(api)
      .post("/shortcodes")
      .send({ url: "https://www.reddit.com" })
      .then(response => {
        expect(response.statusCode).toBe(200);
        const shortcode = response.res.text;
        expect(shortcode).toMatch(shortcodePattern);
        return request(api).get("/shortcodes/" + shortcode);
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.res.text).toMatch(/https:\/\/www\.reddit\.com/);
      });
  });

  test("it should be able to shorten the same URL more than once", () => {
    const url = "https://www.hackkar.com/really-needs-a-short-url";

    return request(api)
      .post("/shortcodes")
      .send({ url: url })
      .then(response => {
        expect(response.statusCode).toBe(200);
        const firstShortcode = response.res.text;
        expect(firstShortcode).toMatch(shortcodePattern);

        request(api)
          .post("/shortcodes")
          .send({ url: url })
          .then(response => {
            expect(response.statusCode).toBe(200);
            const secondShortcode = response.res.text;
            expect(secondShortcode).toEqual(firstShortcode);
          });
      });
  });

  test("it should be able to retrieve URL for a previously created custom shortcode", () => {
    return request(api)
      .post("/shortcodes")
      .send({ url: "https://news.ycombinator.com", shortcode: "hkrnwz" })
      .then(response => {
        expect(response.statusCode).toBe(200);
        const shortcode = response.res.text;
        expect(shortcode).toMatch(shortcodePattern);
        return request(api).get("/shortcodes/hkrnwz");
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.res.text).toMatch(/https:\/\/news\.ycombinator\.com/);
      });
  });

  test("it should return default URL for a missing shortcode", () => {
    return request(api)
      .get("/shortcodes/m1ss1n")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.res.text).toMatch(/https:\/\/www\.hackkar\.com/);
      });
  });

  test("it should return default URL for an invalid shortcode", () => {
    return request(api)
      .get("/shortcodes/INVALID_CODE")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.res.text).toMatch(/https:\/\/www\.hackkar\.com/);
      });
  });
});
