# Cypress Automation Framework

## Setup
1. Install Node.js and npm
2. Clone the repository
3. Run `npm install` to install dependencies

## Running tests
Run `npx cypress open` to open the Cypress Test Runner in visual mode.
Run `npx cypress run` to run the Cypress Tests in headless mode.


# Test failure

You will notice that the test4.js is failing, this is intentional since there is a small bug that allows the user to break the sub-category filtering. 
<img width="283" alt="image" src="https://github.com/ivanlepeskevicius/coderbyte/assets/41808652/ae08b1c0-6e94-4298-bbf5-ae8c25a79e5d">

### Bug description 
The Previous and Next buttons at the bottom of the page are overriding the sub-category filter functionality. 
Basically, when a user chooses to filter by a type of product, and then clicks on the Next button to check more products of the same sub-category, the whole unfiltered list is shown instead. 

[Kapture 2024-04-19 at 23.49.00.webm](https://github.com/ivanlepeskevicius/coderbyte/assets/41808652/d6c950ae-f752-4433-95be-410afb079501)

### Steps to reproduce
1. Navigate to
2. Click on any of the sub-categories, i.e.: Phones
3. Click on the Next button
4. Check the products that are being shown

### Expected result
The sub-category should only show the items that belong to the selected category. 

### Actual result
By clicking on the Next or Previous button, the user is redirected to the Main category, and all the items are shown rendering the sub-category filter pointless.
