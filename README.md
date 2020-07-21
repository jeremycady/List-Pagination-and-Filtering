# List Pagination and Filtering

script.js reads the student list provided in the original HTML.

It has a global variable, countPerPage, within the script that determines the number of results per page.

With this set, script.js will determine the number of pages and the show the first page with added pagination at the bottom of the page.

Selecting a new page will show those results and update the active link at the bottom.

A search option has also been added to search through the names in the student list. Typing in the search input will filter the students and update the pagination, based on your search.