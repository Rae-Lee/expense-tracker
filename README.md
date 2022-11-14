# -Expense Tracker
![](/public/images/homepage.png)

## :pencil: About the project
The project is a simple expense-tracker with concise interface design. With it you can stay on top of your daily expenses, and see all the monthly expenses in one place. It is built to track on your spending easily, and help you save money.

## :book: Feature
 - Display daily expenses on homepage.
 - Add expenses.
 - Edit and delete expenses.
 - Review and adjust expense categories.
 - See monthly expenses by selecting categories.

 ## :flower_playing_cards: Site
### Login page
Enter email and password or just clicking facebook login button first to log in to your account. 
![](/public/images/login-page.PNG)
### Homepage
Click previous and next buttons to switch daily expenses details.
![](/public/images/homepage.PNG)
### Check monthly expenses 
Click category dropdown button to check monthly expenses details.
![](/public/images/select-category.PNG)
![](/public/images/monthly-expenses.PNG)
### Add expense
![](/public/images/add-expense.PNG)
### Edit/Delete expense
![](/public/images/edit-and-delete-expense.PNG)
## :floppy_disk:Usage
### Getting Start
1. Install Node
Download Node:https://nodejs.org/en/

2. Clone the project 
```js
git clone https://github.com/Rae-Lee/expense-tracker.git
```

3. Open the project and download Express, Express-Handlebars, Mongoose, Dotenv, bcryptjs, express-session, and passport.
```js
npm init -y
```
```js
npm i express@4.16.4
```
```js
npm i express-handlebars@3.0.0
```
```js
npm i mongoose
```
```js
npm i dotenv
```
4. Connect to MongoDB, create a database and add MongoDB_URI to .env file.

5. Add seeds dataset to database
```js
npm run seed
```

6. Create a project on your Facebook developers account, and add FACEBOOK_APP_ID, FACEBOOK_APP_SECRET to .env file.

7. Run the project
```js
npm run start
```
Execute successfully if seeing following message
```js
It is running on http://localhost:3000
```
and you can type" http://localhost:3000 "on your browser to open it.

8. Sign in with example account.
```js
email: father@example.com
password: 12345678
```
## Built with
- bcryptjs 2.4.3
- connect-flash 0.1.1
- dotenv 16.0.3
- express 4.18.2
- express-handlebars 6.0.6
- express-session 1.17.3
- method-override 3.0.0
- mongoose 6.7.2
- passport 0.6.0
- passport-facebook 3.0.0
- passport-local 1.0.0
##  License
MIT © [Rae Lee](https://github.com/Rae-Lee)

