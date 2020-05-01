# Movies Usage

The table comes directly from [this](https://docs.google.com/spreadsheets/d/13_iX2eKjEXO2KqDYPws7p_Ohls-aYRq7Ncn0BjxIZNE/edit?usp=sharing) spreadsheet. The spreadsheet determines what columns appear in the table, what appears on the page that pops up when you click on the row, and the actual data. There are two type of columns:

1. Table columns - the columns that appear in the table
2. Extra columns - the data that appears when you click on a row

The column names for table columns should be what you want the column name to show up as in the table.

Extra column names have the following syntax: name-type(extra). Currently the following 4 types are supported:

- h1: "Heading 1" for titles
- h2: "Heading 2" for subtitles
- p: "paragraph"
- img: "image"

These types correspond directly to HTML tags. For img values you can also specify the width you would like the image to be in data cell by adding *width to the end. An example of a data value for an image column would be: google.com/images/3*300 which would display the image at this url: google.com/images/3, and expand/contract it to be 300 pixels wide. The names of extra columns are not displayed anywhere, but they are still a required field.
