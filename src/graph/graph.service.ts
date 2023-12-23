import { Injectable } from "@nestjs/common";

@Injectable({})
export class Graphservice {
    private readonly adjacencyList = new Map([
        [1, [{ toNode: 2, edgeLabel: ['S', 'A', 'S'] }]],
        [2, [{ toNode: 3, edgeLabel: ['S', 'P', 'S'] }]],
        [3, [{ toNode: 4, edgeLabel: ['R', 'U', 'S'] }]],
        [4, [
            { toNode: 5, edgeLabel: ['R', 'A', 'S'] },
            { toNode: 5, edgeLabel: ['R', 'P', 'B'] }
        ]],
        [5, [
            { toNode: 1, edgeLabel: ['R', 'A', 'S'] },
            { toNode: 2, edgeLabel: ['R', 'P', 'S'] }
        ]]
    ]);

    public shortestPathsToTarget(targetEdge: string[], statuses: number[]): Record<number, string[][]> {
        const paths: Record<number, string[][]> = {};

        statuses.forEach(status => {
            const visited = new Set<number>();
            const queue = [{ node: status, path: [] as string[][] }];

            while (queue.length > 0) {
                const { node, path } = queue.shift();

                if (!visited.has(node)) {
                    visited.add(node);
                    const edges = this.adjacencyList.get(node);

                    for (const edge of edges) {
                        const newPath = [...path, edge.edgeLabel];
                        if (edge.edgeLabel.join() === targetEdge.join()) {
                            paths[status] = newPath.map(arr => [...arr]);
                            break;
                        } else {
                            queue.push({ node: edge.toNode, path: newPath });
                        }
                    }
                }
            }
        });

        return paths;
    }

    public getNextNodeGivenEdge(edge: string[]): number | null {
        let smallestNode = Infinity;

        for (const [node, edges] of this.adjacencyList) {
            edges.forEach(edgeData => {
                if (edgeData.edgeLabel.join() === edge.join() && node < smallestNode) {
                    smallestNode = node;
                }
                if (edgeData.edgeLabel.join() === edge.join() && edgeData.toNode < smallestNode) {
                    smallestNode = edgeData.toNode;
                }
            });
        }

        return smallestNode === Infinity ? null : smallestNode;
    }

}
