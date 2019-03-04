## Hi!
___________

#### Let's start

##### Available commands

`wnp init`

Unpacking the project in the current directory

`wnp dev`

Run "webpack-dev-server"

`wnp add-component`

Adds a component to the folder with the components of the current project.

`wnp add-page`

Adds a page to the folder with the pages of the current project, also reloads "webpack.config && webpack-dev-server" to handle new pages

`wnp build`

Build the project in the folder "build"

`wnp help`

List available commands

___________________________


## Builder

#### Hierarchy

###### app
- assets [Here are all the assets]
- components [Here are all the components]
- core [Here are main.js, helpers, configs]
- pages [Here are all the pages]

___________________________

#### Helpers

`{{> icon src="icon-name.svg"}}` - Only icons in the assets/icons folder and only "svg".

`{{> image src="icon-name.svg"}}` - Only images in the assets/images.

#### Paths

IN SCSS Files

- images - "~images/image-name.ext" - Only images in the assets/images.
- icons - "~icons/icon-name.svg" - Only icons in the assets/icons folder and only "svg".
- fonts - "~fonts/font-name.ext" - Only fonts in the assets/fonts folder


#### Templates

use `{{> component/component}}` - components in components folder - (component-folder / component-name).

ENJOY! ;)

