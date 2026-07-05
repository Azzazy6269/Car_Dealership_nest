import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity'
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type:(process.env.DB_TYPE) as 'mysql',
      host:process.env.DB_HOST,
      port: +(process.env.DB_PORT || 3306),
      username:process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD,
      database:process.env.DB_NAME,
      entities:[User,Report],
      synchronize:true,
      logging:false
    }),
    UsersModule,
    ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
