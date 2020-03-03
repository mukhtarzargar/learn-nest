import {Injectable, BadRequestException} from '@nestjs/common';


@Injectable()
export class ParseIntPipe{
    transform(value, metadata){
        const val = parseInt(value, 10);
        if(isNaN(val)){
            throw new BadRequestException('Validation failed');
        }

        return val;
    }
}