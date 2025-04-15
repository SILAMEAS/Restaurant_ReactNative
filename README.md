# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Steps to Deploy
1. Prepare Your Expo Project
   Verify web support: Ensure your project is configured for web. Run npx expo start, press w to open the web version, and check that it works locally at http://localhost:8081.
   Install dependencies: If you haven’t already, add web support by installing necessary packages:
   bash

         npx expo install react-dom react-native-web @expo/metro-runtime

Check app.json/app.config.js: In your app.json or app.config.js, ensure the expo.web field is correctly set. For a single-page application (SPA), you might have:
json


      {
         "expo": {
               "web": {
               "output": "single"
               }
            }
      }

The output: "single" setting is typical for SPAs to ensure proper routing. If you’re using static rendering for SEO, set it to static and configure redirects later if needed.
Test production build locally: Generate a production build to catch any issues:
bash


      npx expo export --platform web

This creates a dist directory with static files. Test it locally with:
      bash


      npx expo serve

Open http://localhost:8081 to verify it works as expected.
2. Set Up Vercel Configuration
   Create vercel.json: At the root of your project, create a vercel.json file to configure Vercel for an Expo web app. This ensures proper routing for SPAs. Add:
   json


      {
         "rewrites": [
                        {
                        "source": "/(.*)",
                        "destination": "/index.html"
                        }
                     ],
         "cleanUrls": true,
         "trailingSlash": false
      }

The rewrites rule ensures all routes point to index.html for client-side routing, which is critical for SPAs built with Expo Router or React Navigation.
Update package.json: Add a vercel-build script to automate the build process during deployment:
json


      {
         "scripts": {
         "vercel-build": "npx expo export --platform web"
         }
      }

This tells Vercel to run the Expo web export command during deployment.
3. Push Your Project to a Git Repository
4. Script on Vercel


### In the Vercel dashboard, under 

#### "Build Command", change it to:


      npx expo export --platform web
---
   Note : 
         package.json should have this:
   
         {
            "scripts": {
               "vercel-build": "npx expo export --platform web"
            }
         }

#### "Output Directory", change it to: dist


  