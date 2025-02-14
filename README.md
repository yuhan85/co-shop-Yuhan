<div align="center">
  <h3 align="center">Co-Shop</h3>
  <p align="center">
    An online group shopping platform
    <br />
  </p>
</div>

## About The Project
    1. The front end of e-commerce website target farmers and customers. 
    2. It uses database with the back end app, which farmers can manage their shops and inventaries.
    3. The main functionalities: 
        1) User can buy local farmer's groceries
        2) User can buy as a group for cheaper price

### Built With
* [![React][React.js]][React-url] - A JavaScript library for building user interfaces
* [![NodeJS][Node.js]][Node-url] - A JavaScript runtime built on Chrome's V8 JavaScript engine
* [![NextJS][Next.js]][Next-url] - A React framework for production-grade applications
* [![MongoDB][MongoDB]][MongoDB-url] - A document-based NoSQL database
* [![Tailwind][Tailwind_bdg]][Tailwind-url] - A utility-first CSS framework for rapid UI development
* [![Styled Components][Styled_Components_bdg]][Styled_Components-url] - A CSS-in-JS library for styling React components

### Requirement
    Home page:
    1.	Header
    2.	Navigation bar:Product detail page, Shopping cart, Check out, Contact me page
    3.	Big banner, User can click button in the big banner to view the product detail page. 
    4.	Footer

    Checkout page:
    1. Share the same Navigation and footer component with Homepage
    2. 5 info forms for checkout (Form validation is required)
        1) Shipping Info
        2) Billing Info
        3) Payment method
        4) Addition info
        5) Confirmation
    3. An order summary box contains every product in current order, subtotal fee and total fee

### Environment setting and dependencies
    * Install Node v18+ LTS
    * Follow up tutorial(6:30:00): https://www.youtube.com/watch?v=dTFXufTgfOE&t=24259s

## Getting Started - this is a Typescript project, following are the steps to create the project from scratch
1. Create front end app: 
    npx create-next-app@latest .
    √ Would you like to use TypeScript? ... Yes
    √ Would you like to use ESLint? ... Yes
    √ Would you like to use Tailwind CSS? ... No 
    √ Would you like to use `src/` directory? ... No 
    √ Would you like to use App Router? (recommended) ... No 
    √ Would you like to customize the default import alias (@/*)? ...  Yes
    √ What import alias would you like configured? ... @/*

2. Install styled-components and react icons
    npm install styled-components
    npm install react-icons

3. Run app in the development server
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```
4. GitHub collaboration best practice-refer the github-best-practice.txt

5. Install VScode Extension - ES7
   VSCode extension that provides shorthand commands like rafce to quickly generate React functional components with an arrow function and export.

6. Refacture 2024-12-17
   Create server folder for backend and database 
   Install the following dependancies
   uncer src folder: 
    1.npm install ts-node --save-dev 
    (role: ts-node is a TypeScript execution and REPL for Node.js, which means it allows you to directly run TypeScript code without compiling it to JavaScript first.)
    
   2. npm install -g ts-node 
   (Role: Makes ts-node available as a global command.)
   
   3. npm install express --save 
   (Role: Express is used for building APIs or web applications. it serves as the framework for the server that connects to the database and handles incoming requests.)

   4. npm install cors --save
   (Role: The cors middleware enables Cross-Origin Resource Sharing (CORS) in your Express app.(e.g., if your front-end and back-end are hosted on different domains)).

   5. npm install --save-dev @types/cors   
   (Role: Since cors is written in JavaScript, this package provides TypeScript typings so that you get type checking and IntelliSense support in your TypeScript code when using cors.)   

   6. Create empty `coshop-db` dabase according to .env
    (Database is under models folder, make sure "DB_PASSWORD" is your password)

   7. run `client/.gitignore` in the terminal 

   8. run `ts-node index.ts` server is listening local host 3000

   9. run `npm run dev` in client directory, front end works for every page other than product page

   10. put .gitignore under project to ignore all node_modules

   11. 2025-1-21 add seeds by run 'ts-node .\lib\seed.ts' under \server\src

   12. Need to run `npm install` after pull to update node--modules

   13. Install Sequelize acts as a bridge between your   
        application's object-oriented code and relational databases

   npm install sequelize mysql2
       npm install --save-dev @types/sequelize

   14.  Optimize country controller and model

   15. Custom Errors class globally

   16. npm install express-validator

   17. npm install --save-dev @types/bcrypt npm install bcryptjs ( We use bcryptjs to encript and validate encripted/hashed password )
   
   18. npm install --save-dev @type/jsonwebtoken npm install jsonwebtoken ( We use jsonwebtoken to generate JWT token for authentication )

## License

This work is licensed under CC BY-NC 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by-nc/4.0/


[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[MongoDB]: https://img.shields.io/badge/MongoDB-000000?style=for-the-badge&logo=MongoDB&logoColor=green
[MongoDB-url]: https://img.shields.io/badge/MongoDB-000000?style=for-the-badge&logo=MongoDB&logoColor=green
[Node.js]: https://img.shields.io/badge/node.js-000000?style=for-the-badge&logo=nodedotjs&logoColor=green
[Node-url]:https://nodejs.org/en
[MongoDB-url]:https://www.mongodb.com/
[Tailwind_bdg]: https://img.shields.io/badge/tailwindcss-000000?style=for-the-badge&logo=tailwindcss&logoColor=blue
[Tailwind-url]:https://tailwindcss.com/
[Styled_Components_bdg]:https://img.shields.io/badge/styledcomponents-000000?style=for-the-badge&logo=styledcomponents
[Styled_Components-url]:https://styled-components.com/


