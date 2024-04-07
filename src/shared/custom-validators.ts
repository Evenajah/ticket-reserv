import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { Types } from 'mongoose';

export function IsArrayOfMongoIds(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsArrayOfMongoIds',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!Array.isArray(value)) {
            return false;
          }
          return value.every((id: any) => Types.ObjectId.isValid(id));
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be an array of valid MongoDB ObjectIds`;
        },
      },
    });
  };
}
