import { priorityQueue } from "./priorityQueue"
import { Map, fromJS } from "immutable"

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
  getNeighbors: (v: GVertex) => GVertex[],
  distanceBetweenTwoVertices: (a: GVertex, b: GVertex) => number,
  source: GVertex,
  isTarget: (vertex: GVertex) => boolean,
  queue = priorityQueue<GVertex>()
): number {

  let distances = Map<GVertex, number>([[source, 0]])
  queue.enqueue([source, 0])

  while (!queue.isEmpty()) {
    const shortestVertex = queue.dequeue()
    const currentVertex = shortestVertex[0]
    const neighborVertices = getNeighbors(currentVertex)

    if (isTarget(currentVertex)) {
      return shortestVertex[1]
    }

    for (const neighborVertex of neighborVertices) {
      const newDistance = distances.get(currentVertex) + distanceBetweenTwoVertices(currentVertex, neighborVertex)
      if (newDistance < (distances.get(neighborVertex) || Infinity)) {
        distances = distances.set(neighborVertex, newDistance)
        queue.enqueue([neighborVertex, newDistance])
      }
    }
  }
}
