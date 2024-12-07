const amqp = require('amqplib');
const ExchangeTypes = require('../enums/exchangeTypes');
const { connectToRabbitMQ } = require('../configs/rabbitmq.connection');

class RabbitMQProducer {

    async sendMessage(message){
        let connection;
        let channel;
        try {
            connection = await connectToRabbitMQ();
            channel = await connection.createChannel();

            switch (message.exchangeType) {
                case ExchangeTypes.DIRECT:
                    await channel.assertExchange(message.exchange, ExchangeTypes.DIRECT, { durable: true });
                    await channel.publish(message.exchange, message.routingKey, Buffer.from(message.content));
                    console.log(`Sent message to direct exchange ${message.exchange} with routing key ${message.routingKey}`);
                    break;
                case ExchangeTypes.FANOUT:
                    await channel.assertExchange(message.exchange, ExchangeTypes.FANOUT, { durable: true });
                    await channel.publish(message.exchange, '', Buffer.from(message.content));
                    console.log(`Sent message to fanout exchange ${message.exchange}`);
                    break;
                case ExchangeTypes.TOPIC:
                    await channel.assertExchange(message.exchange, ExchangeTypes.TOPIC, { durable: true });
                    await channel.publish(message.exchange, message.routingKey, Buffer.from(message.content));
                    console.log(`Sent message to topic exchange ${message.exchange} with routing key ${message.routingKey}`);
                    break;
                case ExchangeTypes.HEADERS:
                    await channel.assertExchange(message.exchange, ExchangeTypes.HEADERS, { durable: true });
                    await channel.publish(message.exchange, '', Buffer.from(message.content), {headers: message.headers});
                    console.log(`Sent message to header exchange ${message.exchange}`);
                    break;
                default:
                    console.error('Invalid exchange type and sending message default via queue name');
                    await channel.assertQueue(message.queue, { durable: true });
                    await channel.sendToQueue(message.queue, Buffer.from(message.content), { persistent: true });
                    console.log(`Sent message to queue ${message.queue}`);
            }

            await channel.close();
            await connection.close();
        } catch (error) {
            console.error('Error: ', error);
        }
    }

}

module.exports = {
    RabbitMQProducer
};
