# Dijkstra's algorithm

This repos contains an implementation of [dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) that can be used with any data structure.

<img alt="demo" src="dijkstra.gif" />

> Dijkstra's algorithm is a variant of the [BFS algorithm](https://en.wikipedia.org/wiki/Breadth-first_search) that finds the shortest path between two nodes in a graph.

## Motivation

I discovered the Dijkstra's algorithm when I was working on [advent-of-code 2021 day 15](https://adventofcode.com/2021/day/15).
Each example of the algorithm implementation was very specific to the data structure of the current use case, so I tried to write a generic and flexible implementation with the help of [Paul Brauner](https://github.com/polux).

[Dijkstra's function](./src/dijkstra.ts) can accept different data structure as input:
(example of inputs used in [unit tests](./src/dijkstra.test.ts))

1. On this 2D matrix (from advent-of-code example), each vertex is a vec2 coordinate `(y, x)` when the cost of the path is number of the cooridnate.

```ts
const matrix = [
  [1, 1, 6, 3, 7, 5, 1, 7, 4, 2],
  [1, 3, 8, 1, 3, 7, 3, 6, 7, 2],
  [2, 1, 3, 6, 5, 1, 1, 3, 2, 8],
  [3, 6, 9, 4, 9, 3, 1, 5, 6, 9],
  [7, 4, 6, 3, 4, 1, 7, 1, 1, 1],
  [1, 3, 1, 9, 1, 2, 8, 1, 3, 7],
  [1, 3, 5, 9, 9, 1, 2, 4, 2, 1],
  [3, 1, 2, 5, 4, 2, 1, 6, 3, 9],
  [1, 2, 9, 3, 1, 3, 8, 5, 2, 1],
  [2, 3, 1, 1, 9, 4, 4, 5, 8, 1],
]
```

2. This graph can be used too when object keys are verticies and values are neighbors associated to there own cost.

```ts
const graph = {
  start: { A: 5, B: 2 },
  A: { start: 1, C: 4, D: 2 },
  B: { A: 8, D: 7 },
  C: { D: 6, finish: 3 },
  D: { finish: 1 },
  finish: {},
}
```

## Usage

In order to accept different data structures, `dijkstra` recieves some functions as params:

- `getNeighbors: (v: GVertex) => GVertex[]` returns array of vertices that are neighbors of `v`
- `getCostBetweenVertices: (a: GVertex, b: GVertex) => number` returns cost of edge between thwo vertices
- `source: GVertex` vertex from which algorithm starts
- `isTarget: (vertex: GVertex) => boolean` returns `true` if vertex is the target
- `queue = priorityQueueMinHeap<GVertex>()` queue that is used to store vertices in order of their distance from source

exemple of usage:

```ts
const getNeighbors = (vertex) => Object.keys(graph[vertex])
const distanceBetweenTwoVertices = (v1, v2) => graph[v1][v2]
const isTarget = (vertex) => vertex === "finish"

const shortestPathCost: number = dijkstra<string>(
  getNeighbors,
  distanceBetweenTwoVertices,
  "start",
  isTarget
)
```

`dijkstra` returns the shortest path cost from source to target

## Priority Queue

This algorithm is using a [priority queue](https://en.wikipedia.org/wiki/Priority_queue) to store vertices in order of their distance from source. The last one is a big part of Dijkstra implementation if we want to use it with big data structures.

Two types of priority queue have been tested in this algorithm:

- [priority Queue min](./src/priorityQueueMin.ts) (`O(n)`complexity)
- [priority Queue min with binary heap](./src/priorityQueueMinHeap.ts) (`O(log n)`complexity)

The second one will be more efficient because binary heap doesn't require us to iterate over the list.

## Requirement

- node js `>= 16`
- npm `>= 8`

## test it

- Clone the repos

```shell
$ git clone git@github.com:willybrauner/dijkstra-algorithm.git
```

- Install dépendencies

```shell
$ npm i
```

- Start tests once

```shell
$ npm run test
```

- Start tests in watch mode

```shell
$ npm run test:watch
```

## Credits

© Willy Brauner & Paul Brauner
