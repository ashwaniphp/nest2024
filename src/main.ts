import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common/pipes'
import { HttpExceptionFilter } from './http-exception.filter'
import { AllExceptionsFilter } from './all-exceptions.filter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            disableErrorMessages: false,
        })
    )
    /* const { httpAdapter } = app.get(HttpAdapterHost)
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter)) */
    await app.listen(3000)
}
bootstrap()
