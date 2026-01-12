import { Controller, Get, Query } from '@nestjs/common';
import { ProvincesService } from './provinces.service';

@Controller('provinces')
export class ProvincesController {
    constructor(private readonly provincesService: ProvincesService) { }

    @Get()
    getAllProvinces() {
        return this.provincesService.getAllProvinces();
    }

    @Get('search')
    searchProvinces(@Query('q') query: string) {
        if (!query || query.trim().length === 0) {
            return [];
        }
        return this.provincesService.searchProvinces(query.trim());
    }
}
