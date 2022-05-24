Application is divided in smaller modules--->

1> Routes-> A route is a section of Express code that associates an HTTP verb (GET, POST, PUT, DELETE, etc.), a URL path/pattern, and a function that is called to handle that pattern.

2> Controllers->  Controllers are typically callback functions that corresponds to the routers to handle requests.
So a controller can reduce that huge chunk of code into:

    || app.post('/api/exercise/new-user', UserController.addUser); //new user     ||
    || app.post('/api/exercise/add', UserController.addExercise); //new exercise  ||


3> Middlewares-> Middleware can be chained from one to another, Hence creating a chain of functions that are executed in order. The last function sends the response back to the browser. So, before sending the response back to the browser the different middleware process the request.
The next() function in the express is responsible for calling the next middleware function if there is one.



4> Helpers -> This consists of all those functionalities or codebases which will ultimately serve others directly or indirectly. Like the logger function , which will be used by Admin in Controller in getting information from Databases about the logging history of users and admins. So it is viable to keep funtions in seperate folders to keep things organized.

