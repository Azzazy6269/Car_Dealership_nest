import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

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
      entities:[],
      synchronize:true
    }),
    UsersModule,
    ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
