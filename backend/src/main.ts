import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable CORS for frontend
    app.enableCors({
        origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    // Set global prefix
    app.setGlobalPrefix('api');

    const port = process.env.PORT || 3001;
    await app.listen(port);

    console.log(`🌤️ Weather API is running on: http://localhost:${port}/api`);
    console.log(`📍 Provinces endpoint: http://localhost:${port}/api/provinces`);
    console.log(`🌡️ Weather endpoint: http://localhost:${port}/api/weather?lat=17.22&lon=102.43`);
}

bootstrap();
