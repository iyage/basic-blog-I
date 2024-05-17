import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Article {
  @Prop()
  title: string;
  @Prop({ required: true })
  body: string;
}
export const ArticleSchema = SchemaFactory.createForClass(Article);
