import { IsEmpty, IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';

import { EnvValidationMessage } from './mongo.messages';
import { MIN_PORT, MAX_PORT, DEFAULT_MONGO_PORT } from './mongo.const';

export class MongoConfiguration {
  @IsEmpty({ message: "FUCCCCCCCCCCCCCCK" })
  @IsString({ message: EnvValidationMessage.DBNameRequired })
  public name: string;

  @IsEmpty({ message: "FUCCCCCCCCCCCCCCK" })
  @IsString({ message: EnvValidationMessage.DBHostRequired })
  public host: string;

  @IsNumber({}, { message: EnvValidationMessage.DBPortRequired })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @IsOptional()
  public port: number = DEFAULT_MONGO_PORT;

  @IsString({ message: EnvValidationMessage.DBUserRequired })
  public user: string;

  @IsString({ message: EnvValidationMessage.DBPasswordRequired })
  public password: string;

  @IsString({ message: EnvValidationMessage.DBBaseAuthRequired })
  public authBase: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
