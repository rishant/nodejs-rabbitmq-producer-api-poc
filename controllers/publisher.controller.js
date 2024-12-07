const { RabbitMQProducer } = require('../producers/rabbitmq.producer');

exports.publisherMessage = async (req, res) => {
    let { exchange, exchangeType, routingKey, headers, queue, payload } = req.body;
  
    try {
      payload['publisher_timestamp'] = new Date();

      let message = {
        exchange: exchange,
        exchangeType: exchangeType,
        routingKey: routingKey,
        headers: headers,
        queue: queue,
        content: JSON.stringify(payload)
      };
      
      let rabbitMQProducer = new RabbitMQProducer();
      await rabbitMQProducer.sendMessage(message);
      res.status(200).json(`Message sent`);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
};