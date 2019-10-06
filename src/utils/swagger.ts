import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function swaggerD(app) {
    const options = new DocumentBuilder()
        .setTitle('Flowers Shop')
        .setDescription('Flowers Shop Nest API')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api-docs', app, document);
}
