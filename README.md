### Frontend Overview:

This frontend was created using **Create React App** and is written in **TypeScript** for better type safety and development experience. **Bootstrap 4** has been used for styling to ensure a clean and responsive design.

Additionally, a small interface for creating a new poll has been integrated. The form will send data to the backend API upon submission.

### Assumptions for the Frontend:

- **Dynamic Poll Data**: Poll data (question and options) is fetched dynamically from the backend through API Gateway → Lambda → DynamoDB.

- **State Management**: The frontend utilizes **React's `useState`** and **`useEffect`** hooks for managing poll data, the selected vote option, and for updating results.

- **UI Interactions**: Poll options are clickable, and the UI reflects the poll's current state, such as showing results after a vote has been cast.

- **Responsive Design**: The UI is designed to be mobile-responsive, leveraging **CSS Flexbox/Grid** for layout management to ensure it works across devices.

### Running the Application:

To run the frontend application, follow these steps:

1. Locate the **2 TODOs** in the code and ensure that the **test data** is uncommented. Also, make sure to **comment out the API calls**.

2. Run `npm install` to install the necessary dependencies.

3. Then, start the application with `npm start`.

Once these steps are completed, you should be able to see the frontend in action!

**Note:** 
I can only apologise about my front-end skills, they are a bit rusty, so the UI probably isn't as polished as it could be!