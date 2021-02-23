<p align="center"><img width="100" src="https://vuejs.org/images/logo.png" alt="Vue logo"></p>

# Vuejs 2 Component Starter

This is a starter project for building a standalone Web Component using Vuejs.

This starter include the following features:

- VUE-I18N, for the internationalization
- Phrase, our Localization Platform
- Sentry, for error monitoring

And this starter come with the following dev plugin :

- Eslint + AirBnB conf
- Jest
- Typesscript 3.9
- Css pre-processors: SASS

# Table of content

- [Vuejs 2 Component Starter](#vuejs-2-component-starter)
- [Table of content](#table-of-content)
- [Installation](#installation)
  - [Env](#env)
  - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
- [Test your work](#test-your-work)
  - [Lints and fixes files](#lints-and-fixes-files)
  - [Run your end-to-end tests](#run-your-end-to-end-tests)
  - [Run your unit tests](#run-your-unit-tests)
- [Build the web component](#build-the-web-component)
- [Naming Components](#naming-components)
- [Using this component](#using-this-component)
- [Data structure](#data-structure)
- [Internationalization (i18n)](#internationalization-i18n)
  - [Translating](#translating)
- [Sentry, how to use](#sentry-how-to-use)
- [Links](#links)
- [Usefull links](#usefull-links)

# Installation
To start building a new web component using Vuejs, clone this repo to a new directory:

```bash
git clone git@github.com:arthurhamon/vuejs-wc-starter.git my-web-component
cd my-web-component
git remote rm origin
```
and run:

```bash
npm install
npm start
```

## Env
Add your different environment configuration on this file `src/utils/environment.ts`

For development only, you can also copy the file `.env-config` and paste it inside a `.env` file. Then, if you want, you can create `.env.*.local` file, where `*` is `development | staging | production` to have custom env var for your different environment.

## Compiles and hot-reloads for development
```
npm start
```

# Test your work

## Lints and fixes files
To run the linting for the components, run:

```bash
npm run lint
```

## Run your end-to-end tests
```bash
npm run test:e2e
```

## Run your unit tests
To run the unit tests for the components, run:

```bash
npm run test:unit
```

# Build the web component
The build command compiles and minifies the files for production.
To build the component for production, run:

```bash
npm run build
```

Need help? Check out our docs [here](https://cli.vuejs.org/guide/build-targets.html).


# Naming Components
When creating new component tags, we recommend _not_ using `vue` in the component name (ex: `<vue-datepicker>`). This is because the generated component has little to nothing to do with Vuejs; it's just a web component!

Instead, use a prefix that fits your company or any name for a group of related components. For example, all of the Ionic generated web components use the prefix `ion`.


# Using this component
We have created a new HTML custom element called `wc-vuejs` so to use it simply create a new HTML tag, like you do for creating a `div`.
> Note: Custom elements cannot be self-closing because HTML only allows a few elements to be self-closing. Always write a closing tag (\<wc-vuejs>\</wc-vuejs>).

Import the *script* from the dist folder. Or use the [CDN link](#links)
```html
<wc-vuejs wcconfig=""></wc-vuejs>
<script src="dist/wc-vuejs.min.js"></script>
```


# Data structure
The custom element accept one argument `wcconfig`. This object is not require, but usefull if you want to have the same environment for the WC and the mother app.
See the `IWcConfig` (`sr/interfaces/wc-config.ts`) interface for the list of properties.

We also have extented the global instance of Vue by adding some extra properties, to see those props have a look to this file `src/wc-vue.d.ts`.

# Internationalization (i18n)
We are using `vue-i18n` module for the translation, the language is based on `app_locale` cookie. Check the config file : `src/config/i18n.ts`

The translations files are located in `src/i18n/{lang}.json`

## Translating
> If this is the first time, you will probably need to install Phrase Client on your computer:
>
> - download it: [Phrase CLI latest](https://phrase.com/cli/)
> - install it: [How to install the Phrase Client.](https://help.phrase.com/help/phrase-in-your-terminal)

> Don't forget to add your Phrase access_token and project_id on `.phraseapp.yml`.

To push new translation to PhraseApp follow those steps

- Extract website translation (this will automatically detect new untranslated keys and had them on each files)
```bash
npm run i18n:extract
```
- Push it to Phrase (this will send untranslated keys to Phrase client)
> Note: if you have unused keys you need to delete them manualy on the Phrase dashboard
> Click on the new uploaded source file by clicking `review` then click on `Delete unmentioned keys`
```bash
npm run i18n:push
```
- Translate all the missing keys in all locale language with [Phrase](https://app.phrase.com/) dashboard.

- Pull it into the project (this will get the translation you add on Phrase dashboard and add it to our app)
```bash
npm run i18n:pull
```
- Don't forget to create a merge request with the new translation.

# Sentry, how to use
In order to have Sentry not conflicting with other Sentry integration, we run Sentry inside is own Hub.

To use Sentry you need to call the local Sentry. You can do it like this
`this.$sentry.captureMessage('WC error');`

# Links
> TODO: Add your links here, your gitlab project, your design project on figma, your Jira, etc

# Usefull links
* [Vuejs](https://vuejs.org/v2/guide/n)
* [Vue-i18n](http://kazupon.github.io/vue-i18n/)
* [Vue-i18n Extract](https://github.com/pixari/vue-i18n-extract)
* [Sentry](https://github.com/getsentry/sentry-javascript/tree/master/packages/browser)
