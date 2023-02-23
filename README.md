# Cashier challenge

In Cashier.Back folder you will find the backend api

Requirements

- .NET Core 7.0
- SQL Server 2012
- Visual Studio 2022

1- Run script attached in the script folder into you SQL Server, this will restore you Database with seeded data
2- Open you Visual Studio and open you sln solution
3- Edit you DefaultConnection in the appSettings file with you own connection string provided by you SQL Server Instance
4- Run de solution

NOTE:
the API will be available in http://localhost:5124
postman collection is provided in collections folder

DATA:
we provide a set of seeded data to test, those info is below

- card number: 7777333399995555 pin number: 1234 balance: 100000 
- card numbre: 8888333399995555 pin number: 4444 balance: 100000

In Cashier.Front folder you will find the React Frontend

Requeriments

- Node 14
- npm

1- Go to root Cashier.Front folder
2- In comand line window run 'npm install' it will be install all dependencies
3- In the same path run 'npm start'
4- Enjoy




