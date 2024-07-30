
# Introduction

Bookworm is an application that allows user unlock the Story Behind the Cover!

Users can scan their favorite books to discover their hidden gems. Get instant access to the author's insights, intriguing summaries, publication history, and much more. Dive deeper into the world of your beloved reads with just one scan!

# Getting Started

## Step 1: Install dependencies

First, you will need to install all dependencies.

To install dependencies, run the following command from the _root_ of Bookworm project:

```bash
yarn install
```

## Step 2: Start the Metro Server

Start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of Bookworm project:

```bash
yarn start
```

## Step 3: Start the Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start the app(_Android_):

### For Android

```bash
yarn android
```

If everything is set up _correctly_, you should see the app running in your _Android Emulator_ or _Connected Android Phone_ shortly provided you have set up your emulator correctly or connected your android phone correctly.

This is one way to run your app — you can also run it directly from within Android Studio.

### More Information

# Architectural Decision

- Firstly, I apologize for the UI/UX design. Given more time, I would have developed a better design or sought assistance from a UI/UX specialist.
- Regarding the implementation of the book details, all required information (such as Author and Title) was displayed. However, the 'Summary' was not shown because the book API returns multiple books at a time when searching, which complicates the display of summaries.
- Additionally, the free OCR technology used is not very seamless; you need to capture only the name of the book to ensure it shows the correct results.

# Links

To get the apk, github repository, and video demonstration:

- [APK](https://drive.google.com/file/d/14J7yqcEEM-Eop4VDYQ60vGGEh-c8ZK6b/view?usp=share_link).
- [Github](https://github.com/Afeezagbaje/visis-assessment-afeez-agbaje.git).
- [Video Walkthrough](https://vimeo.com/991990819).
