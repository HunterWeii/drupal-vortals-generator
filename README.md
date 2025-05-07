# Drupal Vortals Generator

A simple tools to generate drupal custom modules and components files.

## Requirement

Before using this generator, you will need `Yeoman` installed inside your local machine.

<code>npm install -g yo</code>

## Before Using the Generator

1. Download this repo into your local machine.
2. Run `npm install` to install the `yeoman-generator` package.
3. After that, run `npm link` to link the package.
4. Run `yo --generators` in your command line and you should see the generate name (`drupal-vortals-cms`) with their submodules name (`components` and `modules`).

## How to Use the Generator ?

**Notes:**

Before you run the generator, please make sure that you need to be at the root folder (same level with `web` folder) in your drupal cms codebase.

### Scaffolding Modules Files

Run the following command, then you will be prompt to enter your module name.

`yo drupal-vortals-cms:modules --drupalTheme=<YOUR_DRUPAL_CUSTOM_THEME>`

Thats it !

**Please note that you still need to bind the css manually into .library.yml file**

### Scaffolding Components Files

Run the following command, then you will be prompt to enter your component name.

`yo drupal-vortals-cms:components --drupalTheme=<YOUR_DRUPAL_CUSTOM_THEME>`

Thats it !
