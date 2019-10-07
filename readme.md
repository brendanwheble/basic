# Docker Basics

## Image

Is a recipe for a cake

## Container

Is the cake. You can bake many cakes from one recipe.

# Tutorial Steps
Run "npm install" to download packages

There are 6 git tags (numbered 1 to 6) that build up to the final solution.
Use "git checkout <tag>" to switch between them

## Tag 1
Bare bones web server running on http://localhost:3000

To run the server:
npm start

## Tag 2
Web server using production packages Koa and Koa-router

To run the server:
npm start

## Tag 3
Web server. Added /arango route. Will error because Arango doesn't exist

To run the server:
npm start

## Tag 4
Added dockerignore and dockerfile.

dockerignore operates like a gitignore file and excludes unwanted files

dockerfile is the template for building a docker image

To build an image called "basic" (don't forget the trailing period!!):

````
docker build -t basic .
````

You can see your images by typing:

````
docker images
````

You can start a container from this image by typing:

````
docker run -d -p "3000:3000" basic
````

## Tag 5
Now we introduce the docker-compose command.

This allows us to create complex environments using a single yml file.

docker-compose.yml will create two services: "arango" and "basic"

````
docker-compose up
````

They will be accessible on localhost:3000 and localhost:8529

Use the command below to stop the services. The -v switch tidies up the temporary volumes that are created and quickly fill your disk!
````
docker-compose down -v
````

## Tag 6
Deploying to Docker Swarm

This tag adds a deploy folder with two files, basic.yml and arango.yml

Firstly, we need to switch Swarm mode on:

````
docker swarm init
````

Now, we manually create a network called "test" for our services to share:

````
docker network create --driver=overlay --attachable test
````

Create the Arango stack:

````
docker stack deploy -c ./deploy/arango.yml arango
````

And the basic stack:

````
docker stack deploy -c ./deploy/basic.yml basic
````

Remove the stacks with:

````
docker stack rm <stack>

e.g.
docker stack rm arango
````

# Docker Commands

## Create network
Create a network called "test"

````
docker network create --driver=overlay --attachable test
````

## Build image
````
docker build -t <<INSERT IMAGE NAME>> .
````

## List images
````
docker images
````

## List containers
````
docker ps -a
````

## Kill a container
Usually only the first 4 characters of <<CONTAINER ID >> are required

````
docker rm -f -v <<CONTAINER ID>>
````

## List stacks
````
docker stack ls
````

## List services
````
docker service ls
````

## List containers running in a service
````
docker service ps <<SERVICE NAME>>

e.g.
docker service ps basic_basic
````