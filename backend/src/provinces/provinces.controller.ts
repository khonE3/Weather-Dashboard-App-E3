import { Controller, Get, Query } from '@nestjs/common';
import { ProvincesService, Province } from './provinces.service';

@Controller('provinces')
export class ProvincesController {
    constructor(private readonly provincesService: ProvincesService) { }

    @Get()
    getAllProvinces(): Province[] {
        return this.provincesService.getAllProvinces();
    }

    @Get('search')
    searchProvinces(@Query('q') query: string): Province[] {
        if (!query || query.trim().length === 0) {
            return [];
        }
        return this.provincesService.searchProvinces(query.trim());
    }
}
