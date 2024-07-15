import { Module } from '@nestjs/common';

import { BlogUserModule } from '@project/account/blog-user';
import { AuthenticationModule } from '@project/account/authentication'
import { AccountConfigModule } from '@project/account/config';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    AccountConfigModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
