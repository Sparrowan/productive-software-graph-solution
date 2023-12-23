import { Controller, Post, Body, HttpException, HttpStatus } from "@nestjs/common";
import { Graphservice } from "./graph.service";
import { NextStatusDto, ShortestPathDto } from './dto';


@Controller('graph')
export class GraphController {
    constructor(private graphService: Graphservice) {
    }
    @Post('nextshorteststatus')
    nextShortestStatus(@Body() requestBody: NextStatusDto) {
        if (!requestBody || !requestBody.transition) {
            throw new HttpException('Transition is required is required', HttpStatus.BAD_REQUEST);
        }
        const nextNode = this.graphService.getNextNodeGivenEdge(requestBody.transition);
        return nextNode;

    }
    @Post('nextShortestSeriesPath')
    nextShortestSeriesPath(@Body() requestBody: ShortestPathDto) {
        if (!requestBody || !requestBody.transition) {
            throw new HttpException('Transition is required', HttpStatus.BAD_REQUEST);
        }
        if (!requestBody.statuses) {
            throw new HttpException('Statuses are required', HttpStatus.BAD_REQUEST);
        }
        const paths = this.graphService.shortestPathsToTarget(requestBody.transition, requestBody.statuses);
        return paths;

    }

}