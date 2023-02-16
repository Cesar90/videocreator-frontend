# Video Creator Frontend

This project is a “Videos Creator Platform” , where
new video creators can upload (video URL) new videos, sign up, list the available videos and video creators.

## Requirements

- Node >= 14.0.0

## Running

1. Create .env file and to add the following Environment Variables

```
    REACT_APP_APIURL=""

    Note: If you have problem to run the react project use the following environment variable
    SKIP_PREFLIGHT_CHECK=true
```

2. Intalls dependencies

```
    npm install
```

3. To run the project in mode dev run the following command: `npm run start`

## Structure

- api/ - Environment variable for API URL that the app uses
- clientProvider/ - Handle logic for request done by Axios
- components/ - Main components of app
- context/ - Handle context of app along reducer for any action of app
- pages/ - Pages of the app
- routers/ - Handle logic for decide which route to use for which user
- utils/ - Some util types or methods that you can use in all app
