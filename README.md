yet another character storage site made in svelte and pocketbase

# structure
## public
this has the fonts and images to be served publicly to the frontend

## lib
this contains much of the functionality for the website, like components or connecting to databases
### lib/components
this has reusable components used throughout the website, like alerts, dialog boxes, toasts
#### lib/components/editors
specialized components for the character (and possibly page) editors, since these kinda have a lot of beefy functionality
### lib/utils
this contains necessary code to connect to the backend, store login information in the browser, and validate fields

## routes
these are pages that lead to different sections of the website. pages in the `routes` folder that are not in subfolders are usually main website sections, such as about, homepage, login, register, etc
### routes/chara
character-specific routes, such as browsing characters, creating new characters, a singular character's page, etc
### routes/user
user-specific routes, such as settings, user profile, other user profiles, etc
