// import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
// import Joi =  require('@hapi/joi')

// @Injectable()
// export class JoiValidationPipe implements PipeTransform {
//   constructor(private readonly schema: Joi.ObjectSchema) {}

//   transform(value: any, metadata: ArgumentMetadata) {
//       let error = this.schema.validate(value);
//         // const { error } = this.schema.validate(value);
//         if (error) {
//             throw new BadRequestException('Validation failed');
//         }

//         return value;
//     }
// }

import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException} from '@nestjs/common'
import { validate } from 'class-validator';
import { plainToClass} from 'class-transformer';

@Injectable()
export class validationPipe implements PipeTransform<any>{
    async transform(value: any, {metatype}: ArgumentMetadata){
        if (!metatype || !this.toValidate(metatype)){
            return value;
        }
        const object = plainToClass(metatype, value);
        object.is_superuser = false;
        object.is_active = false;

        const errors = await validate(object);
        if( errors.length > 0){
            throw new BadRequestException({error: errors});
        }
        return object;
    }

    private toValidate(metatype: Function): boolean{
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype)
    }
}