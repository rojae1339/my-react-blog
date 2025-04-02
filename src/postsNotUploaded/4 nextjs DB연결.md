```
//.env || .env.local
DB_HOST=localhost  
DB_USER=root  
DB_PASSWORD=password 
DB_NAME=mydatabase  <-- 스키마
DB_PORT=3306
```

```
npm install mysql2
npm install --save-dev @types/mysql
```

```ts
//_lib.db.ts

import mysql from 'mysql2/promise';  
  
const pool = mysql.createPool({  
    host: process.env.db_HOST,  
    user: process.env.db_USER,  
    password: process.env.db_PASSWORD,  
    database: process.env.db_NAME,  
    port: Number(process.env.db_PORT),  
    waitForConnections: true,  
    connectionLimit: 10,  
    queueLimit: 0,  
});

//추가 crud작업
pool.
```