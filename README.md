# Secret server solution(s)
## Description 
### Branches
> There are 3 branches in this repo with two solutions in them.
> The master branch contains the primary solution which works with the ttl index provided by mongodb.  
> Also ttl-with-mongo-ttl contains the same code.  
> The 'with-cron-for-ttl' branch uses a cron process for checking secret expiration dates.
---
### Start the program
> This is a monorepo... In the root directory you can initiate the program with 
> ```sh
> docker-compose up --build
> ```
> After this process finished you should be able to reach the frontend from your browser on the `localhost:8080` url
> Because it is not a code for production, I also pushed the .env file for the easier start.
---
### Start the backend tests
> There is a script in the root directory called `startBackendTest.js`
> Please initiate it with
> ```sh
> node startBackendTest.js
> ```
> If the program is already running, it will kill the docker containers which were initiated with the `docker-compose up` from this root directory.  
> The test process is a bit long, because it tests also the ttl functionality.