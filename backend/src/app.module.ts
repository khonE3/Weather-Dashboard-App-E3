import { Module } from '@nestjs/common';
import { WeatherModule } from './weather/weather.module';
import { ProvincesModule } from './provinces/provinces.module';

@Module({
    imports: [WeatherModule, ProvincesModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
