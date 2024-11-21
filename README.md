This front end was created using create-react-app and subsequently written in TypeScript
I have used Bootstrap 4 to help with styling

I have also included a small front end for creating a new poll, that would call an api on submit

For the frontend, the following assumptions were made:

**Dynamic Poll Data:** Poll question and options are fetched dynamically from the backend (API Gateway -> Lambda -> DynamoDB).
**State Management:** React's useState and useEffect are used for managing the poll data, vote selection, and result updates.
**UI Interactions:** Poll options are clickable and the UI reflects the state of the poll (e.g., showing results after voting).
**Responsive Design:** The frontend is designed to work across devices using CSS Flexbox/Grid for layout management.

To run the application find the 2 TODOs and make sure the test data below is uncommented and the calls to the API above are commented out
Then run `npm install`
`npm start`

You should now be able to see the front end