import { priorityQueueMin } from "./priorityQueueMin"
import { priorityQueueMinHeap } from "./priorityQueueMinHeap"
const { log } = console

/**
 * dijkstra
 * @param getNeighbors
 * @param getCostBetweenVertices
 * @param source
 * @param isTarget
 */
export function dijkstra<GVertex>(
  getNeighbors: (v: GVertex) => GVertex[],
  getCostBetweenVertices: (a: GVertex, b: GVertex) => number,
  source: GVertex,
  isTarget: (vertex: GVertex) => boolean,
  queue = priorityQueueMinHeap<GVertex>()
): number {
  let distances = { [`${source}`]: 0 }
  queue.enqueue(source, 0)
  let finalCost = 0

  while (!queue.isEmpty()) {
    const shortestVertex = queue.dequeue()
    const currentVertex = shortestVertex.key    
    const neighborVertices = getNeighbors(currentVertex)
  
    if (isTarget(currentVertex)) {
      finalCost = shortestVertex.priority
      break
    }

    for (const neighborVertex of neighborVertices) {
      const newDistance = distances[`${currentVertex}`] + getCostBetweenVertices(
        currentVertex,
        neighborVertex
      )
  
      if (newDistance < (distances[`${neighborVertex}`] || Infinity)) {
        distances[`${neighborVertex}`] = newDistance
        queue.enqueue(neighborVertex, newDistance)
      }
    }
  }

  return finalCost
}
