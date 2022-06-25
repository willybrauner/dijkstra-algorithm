import { logicalExpression } from "@babel/types"
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
  getNeighbors: (v: GVertex, graph?) => GVertex[],
  distanceBetweenTwoVertices: (a: number, b: GVertex, graph?) => number,
  source: GVertex,
  isTarget: (vertex: GVertex, target?) => boolean,
  queue = priorityQueue()
): number {

  const distances = new Map()
  distances.set(source, 0)
  queue.enqueue([source, 0])
  let finalDistance: number = 0

  let count = 0

  while (!queue.isEmpty()) {
    const shortestVertex = queue.dequeue()
    log('--------------------------------shortestVertex',shortestVertex)
    const currentVertex = shortestVertex[0]
    log("currentVertex",currentVertex)
    const neighborVertices = getNeighbors(currentVertex)
    log('neighborVertices',neighborVertices)

    if (isTarget(currentVertex)) {
      finalDistance = shortestVertex[1]
      break
    }

    for (const neighborVertex of neighborVertices) {
      log("distances", distances)
      log('distances.get(currentVertex)',distances.get(currentVertex))
      const newDistance = distanceBetweenTwoVertices(distances.get(currentVertex), neighborVertex)
      log('neighborVertex',neighborVertex)
      log('newDistance',newDistance, distances.get(neighborVertex))
      
      
      if (newDistance < (distances.get(neighborVertex) || Infinity)) {
        distances.set(neighborVertex, newDistance)
        queue.enqueue([neighborVertex, newDistance])
        
      }   
    }

    count ++
          log("queue.collection",queue.collection)

    if(count === 12)  break
    
  }

  return finalDistance
}
