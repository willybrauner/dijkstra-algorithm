import { priorityQueue } from "./priorityQueue"
const { log } = console

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
  queue = priorityQueue<GVertex>()
): number {
  let distances = { [`${source}`]: 0 }
  queue.enqueue([source, 0])
  let finalDistance = 0
  let count = 0

  while (!queue.isEmpty()) {
    const shortestVertex = queue.dequeue()
    const currentVertex = shortestVertex[0]
    // log("currentVertex",currentVertex)
    const neighborVertices = getNeighbors(currentVertex)
    // log('neighborVertices',neighborVertices)

    if (isTarget(currentVertex)) {
      finalDistance = shortestVertex[1]
      break
    }

    for (const neighborVertex of neighborVertices) {
      // log("distances", distances)
      // log('distances[`${currentVertex}`])',distances[`${currentVertex}`])
      const newDistance = distanceBetweenTwoVertices(
        distances[`${currentVertex}`],
        neighborVertex
      )
      // log('neighborVertex',neighborVertex)
      // log('newDistance',newDistance, distances[`${neighborVertex}`])

      if (newDistance < (distances[`${neighborVertex}`] || Infinity)) {
        distances[`${neighborVertex}`] = newDistance
        queue.enqueue([neighborVertex, newDistance])
      }
    }

    count++
    // log("queue.collection",queue.collection)
    //if(count === 12)  break
  }

  return finalDistance
}
