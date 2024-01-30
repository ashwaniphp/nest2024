import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!'
    }
    getCalculator(a: number, b: number, c: string): number {
        if (c == 'add') {
            return a + b
        } else if (c == 'subtract') {
            return b - a
        } else if (c == 'multiply') {
            return a * b
        }
    }
}
