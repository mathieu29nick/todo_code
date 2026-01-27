import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TachesModule } from './taches/taches.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        type: 'mysql',
        host: cs.get<string>('DB_HOST'),
        port: cs.get<number>('DB_PORT'),
        username: cs.get<string>('DB_USER'),
        password: cs.get<string>('DB_PASSWORD'), 
        database: cs.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js'],
        synchronize: true,
        autoLoadEntities: true,
      })
    }),
    TachesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
