import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function connectToRabbitMQ(app: any) {
  try {
    const microservice = app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://luuhsantanafs:Lucas102030@localhost:5672'],
        queue: 'orders-queue',
        noAck: false,
        queueOptions: {
          durable: true,
        },
      },
    });

    await microservice.listen(() => {
      console.log('Conectado ao RabbitMQ com sucesso!');
    });
  } catch (error) {
    console.error('Erro ao conectar ao RabbitMQ:', error);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await connectToRabbitMQ(app);
  await app.listen(3001);
}

bootstrap();
