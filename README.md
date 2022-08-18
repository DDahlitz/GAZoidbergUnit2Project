# GAZoidbergUnit2Project
GA Zoidberg Unit 2 Project

https://github.com/DDahlitz/GAZoidbergUnit2Project

https://powerful-stream-78129.herokuapp.com/bookworm

App called Overbooked

It allows users to catalogue to their owned books/ wishlist and catalogue which ones they have already read or not.

Users can log the Book title, author name, genre, description, and price(only displays if not owned). Books can be added, updated, and deleted from the collection. Users are able to write a description about each book entry and edit those entries.




Started this project by outlining and determining page layouts
basic HTML structure for the different pages were made
Routes were then added to the server.js file while confirming they did connect to the pages
After creating the index and new route, tested with a basic creation of an object in the collection
Created the edit route and edited the existing object
Created additional objects, and continued to ubdate, paying attention to the checkboxes and confirming the boolean values correctly changes
created the delete route, and confirmed in Mongo Atlas the object was deleted

This is the first time I have used bootstrap to do the majority of the CSS
The documentation provided by bootstrap was the info used to learn bootstrap

Basic bootstrap used to place items into rows and columns scale and rearrange with viewport sizes
Folder and file made in public directory for js use on the page

Jquery added to the All/ Owned/ Unowned Buttons
Jquery added in the index.ejs file in Script tags
The cards made with Flex box were cleaned up and images placed flush with top, right, and left
Cards given max-height with overflow hidden

jquery placed in a separate ejs file and linked through a partial

I was having difficulties linking the two controllers and the reviews.js route is not running correctly
Spent too much time trying to link the controllers and made things worse, after some time will come back to a branched version and clean up to make it work