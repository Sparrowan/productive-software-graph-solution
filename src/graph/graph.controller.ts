import { Controller, Post } from "@nestjs/common";
import { Graphservice } from "./graph.service";

@Controller('graph')
export class GraphController {
    constructor(private graphservice: Graphservice) {
    }
    @Post('nextshorteststatus')
    nextShortestStatus() {
        return this.graphservice.nextShortestStatus()

    }
    @Post('nextShortestSeriesPath')
    nextShortestSeriesPath() {
        return this.graphservice.nextShortestSeriesPath()

    }

}