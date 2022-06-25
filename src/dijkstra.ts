import { priorityQueue } from "./priorityQueue"

const { log } = console

// graph terminology
// source (start)
// target (end)
// vertex (sommet)
// vertices (sommets)

/**
 * dijkstra
 * @param getNeighbors
 * @param distanceBetweenTwoVertices
 * @param source
 * @param isTarget
 */
export function dijkstra<GVertex>(
  getNeighbors: (v: GVertex, graph) => GVertex[],
  distanceBetweenTwoVertices: (a: GVertex, b: GVertex) => number,
  source: GVertex,
  isTarget: (a: GVertex) => boolean,
  queue = priorityQueue()
): number {

  const distances = new Map()
  distances.set(source, 0)
  queue.enqueue([source, 0])
  // let finalDistance: number

  while (!queue.isEmpty()) {
    const shortestVertex = queue.dequeue()
    const currentVertex = shortestVertex[0]
    const neighborVertices = getNeighbors(currentVertex)

    if (isTarget(currentVertex)) {
      return shortestVertex[1]
      // finalDistance = shortestVertex[1]
      // break
    }

    for (const neighborVertex of neighborVertices) {
      const newDistance = distanceBetweenTwoVertices(currentVertex, neighborVertex)
      if (newDistance < (distances.get(neighborVertex) || Infinity)) {
        distances.set(neighborVertex, newDistance)
        queue.enqueue([neighborVertex, newDistance])
      }
    }
  }

 // return finalDistance
}
