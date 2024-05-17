import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  Logger,
  HttpCode,
  ValidationPipe,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ResponseEntity } from 'src/response/response.Entity';
import { Article } from './entities/article.entity';
import { QueryArticleDtoParams } from './dto/query-article-params.dto';

@Controller('article')
export class ArticleController {
  private readonly logger = new Logger(ArticleController.name);
  constructor(private readonly articleService: ArticleService) {}
  @HttpCode(201)
  @Post()
  async create(@Body(new ValidationPipe()) createArticleDto: CreateArticleDto) {
    try {
      const article: Article =
        await this.articleService.create(createArticleDto);
      const response: ResponseEntity = new ResponseEntity(
        'Article created Sucessfully',
        201,
        article,
      );
      return response;
    } catch (error) {
      this.logger.fatal(error.message);
      return new InternalServerErrorException('Internal server error');
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query() params: QueryArticleDtoParams) {
    try {
      // params.startDate =
      //   params.startDate === undefined
      //     ? new Date('1984-01-01')
      //     : new Date(params.startDate);
      // params.endDate =
      //   params.endDate === undefined ? new Date() : new Date(params.endDate);

      // params.createdAt = new Date(params.createdAt).toISOString();
      const articles: Article[] = await this.articleService.findAll(params);
      const response: ResponseEntity = new ResponseEntity(
        'List of Articles',
        200,
        articles,
      );
      return response;
    } catch (error) {
      this.logger.fatal(error.message);
      return new InternalServerErrorException('Internal server error');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const article: Article = await this.articleService.findOne(id);
      const response: ResponseEntity = new ResponseEntity(
        'Article ',
        204,
        article,
      );
      return response;
    } catch (error) {
      return new InternalServerErrorException('Internal server error');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateArticleDto: UpdateArticleDto,
  ) {
    try {
      const article: Article = await this.articleService.update(
        id,
        updateArticleDto,
      );
      const response: ResponseEntity = new ResponseEntity(
        'Article Successfully Updated',
        200,
        article,
      );
      return response;
    } catch (error) {
      return new InternalServerErrorException('Internal server error');
    }
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.articleService.remove(id);
    } catch (error) {
      return new InternalServerErrorException('Internal server error');
    }
  }
}
