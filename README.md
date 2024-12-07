"# nodejs-rabbitmq-producer-api-poc" 

## Concept :: AMQP has the following components:

    Producer is an application that sends messages.
    Consumer is an application that receives messages.
    Queue is a buffer that stores the messages.
    Message is the information that is sent from the producer to a consumer.
    Exchange receives messages from producers and pushes them to queues depending on rules defined by the exchange type. The exchange type determines how messages are routed.
    Binding links the queue to the exchange.


**Default exchange** : Routing message to a queue (routing key = name queue)

**Direct exchange** : Routing message to a queue based on routing key (not necessary queue name, routing key = bind key)

**Fanout exchange** : Routing message to more queue (publish/subscribe) and not use a routing key

**Topic exchange** : Routing message to a queue based on routing key like a topic (routing key match a pattern)

**Header exchange** : Routing message to queue based on header filters

**The basic unit of data in AMQP is a frame. They are used to initiate, control and tear down the transfer of messages between two peers. These nine AMQP frame bodies are as follows** :
1. open (the connection) 
2. begin (the session) 
3. attach (the link) 
4. transfer 
5. flow 
6. disposition 
7. detach (the link) 
8. end (the session) 
9. close (the connection)


## Node Project setup

    npm init
    npm install dotenv express amqplib

## Start Express server

    node server.js

## References

    https://www.rabbitmq.com/tutorials/tutorial-one-javascript

||||
| - | - | - |
| [![SC2 Video](https://img.youtube.com/vi/KhYiaEOrw7Q/0.jpg)](https://www.youtube.com/watch?v=KhYiaEOrw7Q) | [![SC2 Video](https://img.youtube.com/vi/igaVS0S1hA4/0.jpg)](https://www.youtube.com/watch?v=igaVS0S1hA4) | [![SC2 Video](https://img.youtube.com/vi/yx5Zbcwa9Z4/0.jpg)](https://www.youtube.com/watch?v=yx5Zbcwa9Z4) |


### RabbitMQ docker

    cmd:\> docker run -it --rm --name local-rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management

### RabbitMQ GUI Portal enable    

    C:\Program Files\RabbitMQ Server\rabbitmq_server-3.13.0\sbin>rabbitmq-plugins.bat list 

    C:\Program Files\RabbitMQ Server\rabbitmq_server-3.13.0\sbin>rabbitmq-plugins.bat enable rabbitmq_management
    
    Stop & Start rabbitMQ service

### RabbitMQ GUI Portal

    http://localhost:15672/
    User: guest
    Pwd: guest

## Testing Publish message API

    curl --location --request POST 'http://localhost:4000/publisher/publish-message' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "queue": "test-direct", 
        "payload": {
            "name": "Rishant Gupta",
            "email": "rishantgupta007@gmail.com"
        }
    }'