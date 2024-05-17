import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './entities/article.entity';
import { QueryArticleDtoParams } from './dto/query-article-params.dto';

@Injectable()
export class ArticleService {
  constructor(@InjectModel('Article') private articleModel: Model<Article>) {}
  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = new this.articleModel(createArticleDto);
    return article.save();
  }

  async findAll(urlparams: QueryArticleDtoParams): Promise<Article[]> {
    // const searchField = {
    //   title: urlparams.title,
    //   // createdAt: {
    //   //   $gte: urlparams.startDate,
    //   //   $lte: urlparams.endDate,
    //   // },
    // };
    return await this.articleModel.find(urlparams);
  }

  async findOne(id: string): Promise<Article> {
    return await this.articleModel.findById(id);
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    return await this.articleModel.findByIdAndUpdate(id, updateArticleDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<void> {
    return await this.articleModel.findByIdAndDelete(id);
  }
}
