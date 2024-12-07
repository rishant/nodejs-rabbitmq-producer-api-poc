const { connectToRabbitMQ } = require('../configs/rabbitmq.connection');

async function consumeMessages(exchangeName, queueName, routingKey, handleMessage) {
    let connection;
    let channel;
    try {
        connection = await connectToRabbitMQ();
        channel = await connection.createChannel();

        await channel.assertExchange(exchangeName, 'direct', { durable: false });
        await channel.assertQueue(queueName, { durable: false });
        await channel.bindQueue(queueName, exchangeName, routingKey);

        console.log(`Waiting for messages from exchange ${exchangeName} with routing key ${routingKey}`);

        channel.consume(queueName, async (message) => {
            if (message !== null) {
                handleMessage(message.content.toString());
                channel.ack(message);
            }
        });

    } catch (error) {
        console.error('Error occurred:', error);
    }
}

module.exports = {
    consumeMessages
};
