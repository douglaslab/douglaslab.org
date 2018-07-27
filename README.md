# Douglas Lab website

This is an html+css+js website. It does not require any static site generators.

## Bulma Customizations

The site uses a slightly customized version of the [Bulma](https://bulma.io/) CSS framework. To use the css styles directly, you can just copy the `css/bulma.css` file. Modifications should be made in `douglaslab.scss` and rebuilt using npm. The build command is defined in the `package.json` file.

 npm install
 npm run build

We override the "primary" color variable and set the max container width to 960px:

 $primary: hsl(217, 71%, 53%)
 $widescreen: $desktop
 $fullhd: $desktop
