# backend_interview

This project is composed of:
 - a Dockerfile that allows to spin up a RabbitMQ instance
 - a C# back-end that sends messages to a "log" RabbitMQ exchange
 - a TypeScript/Node.js API
 - a TypeScript/React front-end


## Run 

- Start rabbitMQ
```
docker-compose up
```

- Start the C# service
```
dotnet restore
dotnet run
```

- Start the API service (it uses `nodemon` that will automatically pick up file changes and reload the service)
```
npm run start
```

- Start the frontend service (it uses `webpack` that will automatically pick up changes and reload the page)
```
npm run start
```