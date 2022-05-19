// here we'll put all the variables that should be constants and reused across the project
// this will allow us to easily configure our project by simply changing some of the data in this file
// we'll only put variables that are important for defining some important data about the application e.g., API url when getting search data and when uploading a recipe to the server
export const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes/';// uppercase as this is a constant that will esssentially never change
export const TIMEOUT_SEC = 10;
export const RES_PER_PAGE = 10;