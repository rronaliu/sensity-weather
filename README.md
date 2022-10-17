# sensity-weather

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```


Notes from Rron:

I've added one test only with JEST. I haven't had the opportunity to work with unit testing, that part was handled by QA's where I worked. 

Vuex, VueRouter are an overkill for a project like this, but I wanted to crank in technologies I use when developing large scale web-apps.
The methodology of writing code like this (modularization) is what we usually use in the company I work in. We find it's 
very easy to have data easily accesible no matter where we need them. It gives us a lot of space to built front-ends with ease.
You can see I store as much logic as possible in the store, leaving only small pieces of code in the Views itself.

I've not used Vue3 + Vite before but I found it very nice (and FAST). I still used optionsAPI as I am more comfortable with that, I'm willing
to switch to CompositionAPI though.

Dist folder is for serving the files for gh-pages. But making the repository private will remove gh-pages. 

If we wanna deploy the project in gh-pages, I think all we need to do is make the repository public, or deploy like this:

Change this line in router/index.js 
from: 
history: createWebHistory()
to:
history: createWebHashHistory()

and uncomment the: 
base: "/sensity-weather/" 
in vite.config.js

then run these lines in the terminal

npm run build
git add dist -f 
git commit -m "..."
git subtree push --prefix dist origin gh-pages

Hopefuly I've provided the information needed.
If you need anything, feel free to contact me.








 
