import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<EnvironmentVariables> =
    app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('capstone1 backend')
    .setDescription('종합설계프로젝트1 백엔드 API문서')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('document', app, document);

  await app.listen(configService.get('PORT', { infer: true }));
}
bootstrap();
