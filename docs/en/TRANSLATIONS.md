# Official WeekBox Translator Guide

Hello! If you are reading this, it means you want to help us translate WeekBox into your native language or a new language. Thank you so much for your contribution!

This guide will teach you step by step how to clone the project, install the necessary tools, run the website on your own computer, and test your translations in real time.

---

## 1. Prerequisites

Before starting to translate, you need to install a couple of tools on your PC if you don't have them yet:

1. **Git**: We use this to download (clone) the source code. [Download it here](https://git-scm.com/downloads).
2. **Node.js**: This is the engine that runs the website. [Download it here](https://nodejs.org/en/download/) (download the LTS version).
3. **A Code Editor**: We recommend [Visual Studio Code (VSCode)](https://code.visualstudio.com/) since it's the best for editing `.json` files.

---

## 2. Clone the Project and Prepare It

Open your terminal (Command Prompt, PowerShell, or the integrated terminal in VSCode) and follow these steps:

1. **Clone the repository** to your computer:
   ```bash
   git clone https://github.com/Crew-Awesome/Weekbox.git
   ```

2. **Enter the folder** of the web project:
   ```bash
   cd weekbox.site
   ```

3. **Install the dependencies and libraries** necessary for the site to work:
   ```bash
   npm install
   ```
   *(This step may take a couple of minutes depending on your internet connection).*

---

## 3. Run the Website Locally

Once everything is installed correctly, it's time to turn on the local server to view the page:

```bash
npm run dev
```

A message will appear in the terminal saying that the server is running on `http://localhost:3000`. 
Open your internet browser (Chrome, Firefox, Opera GX) and enter that link. You should see the WeekBox page running on your own PC!

---

## 4. How to Translate?

The language system is already preconfigured for several languages (English, Spanish, French, Chinese, Turkish, Italian, Portuguese, German, Indonesian, Russian). 

All the texts of the page live inside the folder:
`public/locales/`

### Steps to translate:

1. Go to the `public/locales/` folder and enter the folder of the language you want to translate. For example, `fr` for French, `pt` for Portuguese.
2. Open the `translation.json` file.
3. You will see that all the texts are currently in **English** (because we use English as the base template).
4. Your job is to change **only the text to the right of the colon**, keeping the quotation marks.

**Original Example:**
```json
"downloadNow": "Download Now"
```

**Your Translation (e.g. French):**
```json
"downloadNow": "Télécharger Maintenant"
```

> **IMPORTANT!** Do not change or translate the words on the left (like `downloadNow` or `browseTitle`), as those are the "keys" the code uses to find your text.

### Testing your Translation

The best part of all this is that **you don't need to restart the server**. 
As you save your changes in the `translation.json` file (by pressing `Ctrl + S`), simply go to your browser (`http://localhost:3000`), use the language menu to select your language, and you will see your texts change in real time!

---

## 5. The Magic Colorful "PLAY!" Word

At the bottom of the main page there is a text that says "Nothing else to see, let's PLAY!". The word "PLAY" has the colors of the FNF arrows.
In your `translation.json` file you will find:
```json
"finalCta": "Nothing else to see, let's ",
"finalCtaWord": "PLAY"
```
Make sure to translate the `finalCtaWord` as a single word in uppercase (for example, "JUGAR" in Spanish, "JOUER" in French). The code will automatically color each letter of that word a different color regardless of how many letters it has. Magic!

---

## 6. Submit your Changes

Once you have finished your translation, you can upload your changes to GitHub by making a *Pull Request* or by sending the `translation.json` file directly to the project administrators of Crew-Awesome (Malloy or Britex).

Thank you for helping WeekBox reach the whole world!
