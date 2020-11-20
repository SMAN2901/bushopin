# Online Bus Ticketing System

This project uses following javascript packages:

-   ReactJS
-   React Router Dom
-   Axios

No external css library is used.

Web app link: https://bushopin.web.app

## Usage

Home page has a form for searching buses using location and dates.
Here no validations are applied on date fields.

After pressing the search button, the app gets data from a dummy backend api.
Api link: https://sman2901.pythonanywhere.com/api/trips/1/2

Here 1 and 2 indicates districts and can be at most 64.
The api randomly generates bus list for different combination of locations.

If the required data is already stored in local storage then that stored data is used instead of calling the api.

Everything else is done according to the given instruction.
