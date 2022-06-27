import { priorityQueue } from "./priorityQueue"
//import { Map } from "immutable"
const { Map, fromJS } = require('immutable')



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

  let distances = new Map()
  distances = distances.set(fromJS(source), 0)
  queue.enqueue([fromJS(source), 0])
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
        distances = distances.set(neighborVertex, newDistance)
        queue.enqueue([fromJS(neighborVertex), newDistance])
        
      }   
    }

    count ++
   log("queue.collection",queue.collection)

    //if(count === 1)  break
    
    log('finalDistance',finalDistance)
  }

  return finalDistance
}
