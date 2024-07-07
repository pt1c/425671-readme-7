import { Module } from '@nestjs/common';

import { BlogUserModule } from '@project/account/blog-user';
import { AuthenticationModule } from '@project/account/authentication'

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
