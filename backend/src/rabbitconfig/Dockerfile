FROM rabbitmq:management
COPY definitions.json /etc/rabbitmq/
COPY rabbitmq.conf /etc/rabbitmq/
RUN chown rabbitmq:rabbitmq /etc/rabbitmq/rabbitmq.conf /etc/rabbitmq/definitions.json

ENV RABBITMQ_CONFIG_FILE=/etc/rabbitmq/rabbitmq

EXPOSE 4369 5671 5672 15671 15672 25672

#CMD ["rabbitmq-server"]