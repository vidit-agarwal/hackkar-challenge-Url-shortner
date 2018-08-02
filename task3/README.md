# Task 3: Build a UI for the URL shortener application

## Description

To complete this task, I'll need to add code to contact the API to fetch responses, and update the React component with the result returned by the API. All of  code should go into `src/App.js` - the main application component. There is additional documentation in-line to get you up to speed if any of this is unfamiliar.

Do not modify `package.json` or introduce additional modules. Only Javascript DOM methods should be used to complete this task.

As before, a small test suite is included to check whether the code you've written works as expected.

## Execution

You'll want to keep the API you created in task 2 running before you start the UI.

To build the UI, and make it accessible on port 3001, use the start script:

    $ npm run start

Now, load up [localhost:3001](http://localhost:3001) in your browser. This task includes code that scaffolds the required parts of the UI that the tests depend on. You just need to get the inputs and the buttons working as required by the tests.

## Testing

With both the API server (from task 2) running, and the UI accessible on port 3001, use the test script to launch the _Cypress_ interface for running integration tests:

    $ npm run test

Within the interface, click on `shorten_and_unshorten_a_url_spec.js` to launch the test within Cypress.
