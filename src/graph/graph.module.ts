import { Module } from "@nestjs/common";
import { GraphController } from "./graph.controller";
import { Graphservice } from "./graph.service";

@Module({
    controllers: [GraphController],
    providers: [Graphservice]
})
export class GraphModule { }