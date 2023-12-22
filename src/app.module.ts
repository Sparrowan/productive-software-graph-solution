import { Module } from '@nestjs/common';
import { GraphModule } from './graph/graph.module';
import { Graphservice } from './graph/graph.service';

@Module({
  imports: [GraphModule],
  providers: [Graphservice]
})
export class AppModule { }
