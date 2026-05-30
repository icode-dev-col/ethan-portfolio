# Ethan's Developer Portfolio

Welcome to the official repository for Ethan's Developer Portfolio. Ethan is an orange-belt student at iCode Columbia. This single-page website showcases his coding journey and features six interactive browser-based projects that he built. The portfolio has a responsive layout, a customized dark and light mode theme toggle, and smooth custom CSS animations.

---

## Repository Structure

The project has been restructured to run directly on GitHub Pages. All the main files are located at the root of the repository so that the web server can find them immediately. Here is what the folders and files do:

*   `index.html`: The main web page of the portfolio. It defines the layout, metadata, text, and structure of the website.
*   `css/`: The folder containing the stylesheets that make the page look modern and attractive.
    *   `css/style.css`: The primary styling file. It contains color variables, base layout rules, font setups, and standard keyframe animations.
    *   `css/utilities.css`: A reusable set of utility rules. It manages button styles, interactive card hover states, and dark mode configuration values.
*   `js/`: The folder containing the interactive logic.
    *   `js/script.js`: The JavaScript file that handles the sliding mobile navigation menu and the dark/light theme switching.
*   `assets/`: The folder containing all media assets and projects.
    *   `assets/logo.png` / `assets/pp.png`: Logo and profile photos.
    *   `assets/favicon/`: The customized browser tab icons.
    *   `assets/project/`: The container for the six sub-projects. Each project is stored in its own folder with its own HTML, CSS, and JS code.

---

## Technology Stack

This website is built with clean, modern front-end web technologies. It does not use heavy external frameworks, which makes it load extremely fast.

1.  **HTML5**: The structure is written with semantic tags like header, section, article, and footer. These tags tell search engines and screen readers exactly what each part of the page does, which helps with search engine optimization.
2.  **CSS3**: The design uses a custom variable architecture. A global set of HSL color variables are stored in the root element. When the user changes themes, the website swaps out the color variables to flip the color palette. It also uses CSS Grid to lay out the project cards and CSS keyframe animations to bounce the profile image.
3.  **JavaScript (ES6)**: Standard browser scripting is used to manipulate the page elements in real time. It selects HTML tags, listens for user clicks, updates element classes, and saves user settings inside the browser cache.

---

## How the Core Features Work

### 1. Light and Dark Theme Switcher
The website has a toggle switch in the navigation bar. When a user clicks the switch, a JavaScript function named `switchTheme` is triggered. 
*   **The Code Logic**: The function checks if the toggle checkbox is checked. If it is checked, JavaScript adds a custom attribute named `data-theme="dark"` to the root html tag. If it is unchecked, it sets the attribute to `data-theme="light"`.
*   **The CSS Transition**: In the stylesheet, the custom color variables (like the background color and text color) are redefined under the dark theme attribute block. The browser automatically applies the new colors to the entire website.
*   **Theme Persistence**: To make sure the user does not have to click the toggle every time they visit the website, the JavaScript file uses the `localStorage` object. This browser-level database saves the string value "dark" or "light". When the page loads, JavaScript checks if a theme was saved previously and loads it automatically.

### 2. Stylized "E" Text Logo
Instead of loading a heavy image file, the logo in the top-left corner is a highly stylized text character "E".
*   **HTML Structure**: It is written as a standard link tag with the class name `logo-text`.
*   **CSS Styles**: The stylesheet turns the text into a perfect circle. It does this by setting the width and height to 42 pixels, setting the display to flex to center the letter, and setting the border-radius to 50 percent. A thick yellow border is wrapped around it.
*   **Hover Animation**: When a user hovers their mouse over the logo, a CSS transform property is activated. The logo scales up by 10 percent and rotates a full 360 degrees. The transition is configured with a cubic-bezier mathematical curve to make the rotation feel bouncy and natural.

### 3. Grid Card Hover Overlays
The projects section lists six cards in a grid. Each card displays its corresponding project details when hovered.
*   **Layout Setup**: The main container is styled with CSS Grid. The property `grid-template-columns` is configured to divide the available horizontal space into three equal columns on desktop screens, two columns on tablet screens, and a single column on mobile screens.
*   **Background Images**: In the stylesheet, each card is targeted using the `:nth-child` selector. The browser downloads the corresponding game screenshot from the assets folder and sets it as a cover background.
*   **Hover Overlays**: Each card has a details container that holds the title and technology stack. This details container is styled with an opacity value of 0, making it invisible. When a user hovers over the card, the opacity transitions to 1 over half a second. A dark inset box-shadow is applied to the card background to darken the screenshot and make the white text highly readable.

### 4. Responsive Hamburger Menu
On small screens like smartphones, the navigation links collapse into a vertical list to save space.
*   **The Hamburger Icon**: The menu icon consists of three small spans styled as horizontal bars.
*   **The Class Toggle**: When a user clicks the hamburger button, JavaScript runs a click listener that toggles the `active` class on the button and the navigation menu.
*   **Slide Animation**: When the `active` class is applied to the menu, a CSS transition slides the links into view from the right side of the screen. When the user clicks a link, the menu automatically slides back out of view.

---

## Detailed Sub-Projects Breakdown

Ethan's portfolio hosts six independent front-end applications. Each one operates in its own sandboxed folder with dedicated code:

1.  **Flappy Bird** (`assets/project/flappy bird/`): A recreation of the famous arcade game. It uses HTML5 Canvas and custom JavaScript to simulate gravity, manage collisions, calculate physics, and track the high score.
2.  **Doodle Jump** (`assets/project/doodlejump/`): A platformer game where the player bounces upwards. It uses coordinate tracking, custom keyboard event listeners, and gravity logic to let players jump between platforms.
3.  **Tic Tac Toe** (`assets/project/tic tac toe/`): A classic two-player turn-based board game. The JavaScript file monitors grid cells, checks win conditions after every click, and updates the display to show the winner.
4.  **Clock** (`assets/project/clock/`): A modern clock showing current system time. It uses a JavaScript interval loop that runs every second to fetch system coordinates and rotate the digital hand styles.
5.  **Love Calculator** (`assets/project/love/`): An interactive application that matches names. It uses custom string-length math to return humorous match percentages.
6.  **Coffee Shop** (`assets/project/coffee-shop/`): A front-end web dashboard. It features individual pages for customer accounts, coffee menus, order checkouts, and employee logs, designed with responsive layouts and unified branding.
