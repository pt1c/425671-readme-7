import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public id: string;

  @Expose()
  public avatar: string;

  @Expose()
  public regDate: string;

  @Expose()
  public email: string;

  @Expose()
  public username: string;
}
