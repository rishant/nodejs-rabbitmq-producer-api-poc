const amqp = require('amqplib');

async function connectToRabbitMQ() {
    try {
        let amqpConnectionString = process.env.RABBITMQ_CONNECTION_STRING || `amqp://localhost:5672`
        const connection = await amqp.connect(amqpConnectionString);
        return connection;
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
        throw error;
    }
}

module.exports = {
    connectToRabbitMQ
};
