# Apex Sport Store 
A Term Project of SE262 Frontend Web Development Course.

## Project Description
The purpose of the project is to provide an actual sports store with the ability to sell their products online. Customers can order from this online store easily, and the shop owner can easily add their products to the store. 
	
When a customer visits this online store in their browser, they can look through the products or narrow results for specific products by choosing a category or directly searching via the search bar. Then, the customer looks for the product images, descriptions, prices, and promotions (if available), and if they want to buy, they can add it to the cart and checkout.
	
We worked on the design to get an energetic and sporty look & feel. The primary and secondary colors of our design are Navy Blue and yellow-orange. The layout is designed to be minimalist and simple and look like a traditional online shop UI so that customers can browse through the store’s catalog without confusion about the UI.

## Project Team
- Naw Joyful Awgyi
- Win Naing Kyaw
- Khant Zaw Hein

## How To Setup

1. Clone the repository
```bash
git clone git@github.com:khantzawhein/apex-sport-store.git
```
2. Install dependencies
```bash
npm install
```

3. Generate Prisma Client & Run Migration
```bash
npx prisma generate && npx prisma migrate dev
```
4. Compile SASS
```bash
npm run sass
```

5. Start the server
```bash
npm run start
```

6. Open the browser and go to `http://localhost:3000`


7. To Prepare for the deployment of the Project
```bash
npm run sass-build
npx prisma generate
npx prisma migrate apply
```

