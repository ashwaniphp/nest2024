import { Controller, Get, Post, Body } from '@nestjs/common'
import { AppService } from './app.service'
import { AllParamsDto } from './allParams.dto'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }

    @Post('calculator')
    getCalculator(@Body() myparams: AllParamsDto): number {
        const { number1, number2, action } = myparams
        return this.appService.getCalculator(number1, number2, action)
    }
}
