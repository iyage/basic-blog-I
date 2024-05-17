import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ArticleModule,
    MongooseModule.forRoot(process.env.DB_URL),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
