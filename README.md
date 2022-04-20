# scrollBehavior.js


A simple and easy to use library that creates fullscreen scrolling websites (also known as single page websites or onepage sites) and adds landscape sliders inside the sections of the site.

- [Introduction](https://github.com/dagrox/scrollbehavior.js#introduction)
- [Compatibility](https://github.com/dagrox/scrollbehavior.js#compatibility)
- [Usage](https://github.com/dagrox/scrollbehavior.js#usage)
  - [Including files](https://github.com/dagrox/scrollbehavior.js#including-files)
  - [Required HTML structure](https://github.com/dagrox/scrollbehavior.js#html-structure)
  - [Initialization](https://github.com/dagrox/scrollbehavior.js#initialization)
- [Parameter](https://github.com/dagrox/scrollbehavior.js#parameter)
- [License](https://github.com/dagrox/scrollbehavior.js#license)


## Introduction
scrollbehavior.js is an open source library that is used to implement websites that should support fullscreen scrolling animation. The scroll animation can be customized to the project using parameters, which will be explained in the course of this developer documentation.

Demo page: [scrollbehavior.js](https://www.bitloft.de/showroom/scrollBehavior/example/index.html)

## Supported functions
- Numbering slides
- Scroll to any given slide
- Keyboard scrolling


## Compatibility
This library is fully functional with all common modern browsers. Moreover, due to its future-oriented development, it can be used on almost all end devices without complications. 

## Usage
To guarantee the proper use of the library, the files mentioned below must be included in the project.
 - The JavaScript file `scrollbehavior.js` or its minified version `scrollbehavior.min.js`.
- The CSS file `scrollbehavior.css` or its minified version `scrollbehavior.min.css`.

### Including files:
```html
<link rel="stylesheet" type="text/css" href="scrollBehavior.min.css" />

<script type="text/javascript" src="scrollBehavior.min.js"></script>
```

### Required HTML structure
Start your HTML document with the default [HTML DOCTYPE declaration](https://www.w3schools.com/tags/tag_doctype.asp) on the 1st line of your HTML code.

The structure listed below is consists of a container that acts as a wrapper-element (`<div class="container">` in this case) for the sections it contains. This container is used for the vertical or horizontal arrangement of the sections and for sliding over the sections. The sections within the containers are wrapper-elements that contain the content of the individual pages. In the example below, the section was filled with the content "Slide 1" to "Slide 4" as an example. Below the container are the navigation arrows, which can be activated or deactivated. These are just one of many ways to move around the page. This structure, excluding the navigation, must be found without exception in all projects in which the library is used, in order to be able to use all of its functions.

```html
  <div class="container">
    <section class="section">
      <h1>Slide 1</h1>
    </section>
    <section class="section">
      <h1>Slide 2</h1>
    </section>
    <section class="section">
      <h1>Slide 3</h1>
    </section>
    <section class="section">
      <h1>Slide 4</h1>
    </section>
  </div>
  <div class="nav-arrows">
    <div class="nav-arrows__prev"></div>
    <div class="nav-arrows__next"></div>
  </div>
```

### Initialization

To initialize scrollbehavior.js, the init function has to be called. The parameters listed in the example are used to adapt the library to your project. If not all of these parameters are set, the default values shown are used to initialize the library.

```javascript
let scrollBehavior = new ScrollBehavior('.container', {
      autoInit: true,
      mode: 'horizontal',
      autoScroll: false,
      autoScrollSpeed: 3000,
      recordHistory: true,
      keyboardScrolling: true,
      arrows: {
        enabled: true,
        prev: {
          selector: '.nav-arrows__prev'
        },
        next: {
          selector: '.nav-arrows__next'
        }
      }
    });
```

### Parameters
In the following, the parameters are listed and described.

#### autoInit:
Can take the values `true` or `false`. This parameter gives the user the possibility to initialize the library by the value "true" immediately or by the value "false" at any later time.

#### mode:
Specifies the scroll direction of the slide animation. If a horizontal scroll direction is to be implemented, `horizontal` must be passed to the parameter. For a vertical scroll direction, `vertical` must be given again. This parameter is of the data type `String`.

#### activeClass:
Here you can customize the CSS class assigned to the active section.

#### scrollSpeed:
This parameter allows you to set the duration of the slide animation in milliseconds. 

#### autoScroll:
Can take the values `true` or `false`. This disables or enables automatic scrolling.

#### autoScrollSpeed:
Sets the duration between automatic slide animations in milliseconds.

#### recordHistory:
Can take the values `true` or `false`. This allows the current and past slides to be tracked in the browser's address bar. This way the different slides can be assigned to a unique URL. For example, the first slide displays "any-url.de/#1". If you now switch to the next slide, "any-url.de/#2" will be displayed there. Since the history is saved by the browser, you can jump back to the previous slide by clicking the browser's "Back" button.

#### keyboardScrolling:
Can take the values `true` or `false` and enables or disables the possibility of sliding using the arrow keys on the keyboard.

#### arrows:
Can take the values `true` or `false`. The navigation arrows can be enabled or disabled by the "enabled" parameter. With the help of the two `selector` parameters the CSS class, which are assigned to the `next` and `prev` navigation arrows, can be determined. 

## License
scrollbehavior.js is licensed under the GNU General Public License v3. Use of the library is under the terms of this and must be marked by comments in the source code. A detailed description of how to mark and use the license can be found at gnu.org/licenses/gpl-3.0.html.
