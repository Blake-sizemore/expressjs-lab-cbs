1. body parser should not be used as express and body-parser have merged
    - this also removes the use of path

2. tester item should be placed into the listen(3000) call
    - like so:
        app.listen(3000, 
        ()=>{console.log(`successful connection on port 3000 (launched at ${new Date().toLocaleString()})`)}
        )
    - Knowledge: local host is a shortcut for your own ip address so localhost:3000 == 127.0.0.1:3000

3. Big lesson - how to get node modules back after git upload and git clone, given that the gitignore prevents upload
    - "npm i" created all need node module packages based off of package.json dependencies.

4. Any page load makes a get request
5. readFile pulls all data back in bytes and will need to convert to
    , {encoding:"utf8"}, 
6. Middleware
    - add above routes
    - look into helmet, compression,and morgan
        helmet - security that shores up common 
        compression - looks for repeat Data and trim down on request
        morgan - logging frame work that colors info 