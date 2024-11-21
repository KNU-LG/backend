import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { env } from 'process';
import { join } from 'path';
import { CalendarWidgetModule } from './calendarWidget/calenderWidget.module';
import { ClockWidgetModule } from './clockWidget/clockWidget.module';
import { ScheduleModule } from './schedule/schedule.module';
import { SlideShowModule } from './slideShow/slideShow.module';
import { MusicWidgetModule } from './musicWidget/musicWidget.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: '"reset password" <standby@gmail.com>',
      },
    }),
    UserModule,
    CalendarWidgetModule,
    ClockWidgetModule,
    ScheduleModule,
    SlideShowModule,
    MusicWidgetModule,
    //맨 마지막에 고정
    ServeStaticModule.forRoot({ rootPath: join(env.HOME, 'capstone-media') }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
