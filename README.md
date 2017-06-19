# User Management
Used Technologies/Frameworks:
* Angular 4
* Spring
* Maven
* Liquibase

## Installation
You'll need Maven 3+ and Java 8

### Start Spring Server and Run
The App is already in production mode, the only thing to do is to start the Spring application in order to use it.
Please go into the folder (`Diennea/`) and type the following commands from the command line:

* `mvn clean spring-boot:run` to start Spring Boot
* go to the following URL: `http://localhost:8080`

Login Credentials:
User: "user"
Password: "password"

Or press Start in your favourite IDE.
Note: If the port 8080 is already used please add the line `server.port = 8090` into `/main/resources/application.properties`

### Build Application (not necessary)
Static Angular files have been already copied in the static folder of the Spring project in order to make it up and running.
However, if you prefer building files yourself, please go into the `front` folder and type the following commands from the command line:
* `npm install -g angular-cli` to install angular 2 cli ( globally )
* `npm install` to install Node packages
* `ng build -prod`

You should see auto-generated files copied into `/main/resources/static`

### Other Notes:
I am a Spring newbie, never used it befor this project. I wasn't able to provide a custom Login page. The issue is related to Spring Security configuration settings.
