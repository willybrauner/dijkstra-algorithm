import { dijkstra } from "../src/dijkstra"
const { log } = console

it("should work with 2D matrix", () => {
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

  const getNeighbors = ([y, x], graph = matrix) => [
    ...(graph?.[y - 1]?.[x] ? [[y - 1, x]] : []),
    ...(graph?.[y + 1]?.[x] ? [[y + 1, x]] : []),
    ...(graph?.[y]?.[x + 1] ? [[y, x + 1]] : []),
    ...(graph?.[y]?.[x - 1] ? [[y, x - 1]] : []),
  ]

  const distanceBetweenTwoVertices = (d, [y2, x2], graph = matrix) =>
    d + graph[y2][x2]

  const isTarget = (vertex, target = [9, 9]) =>
    vertex.every((coord, i) => coord === target[i])

  const distance = dijkstra<[number, number]>(
    getNeighbors,
    distanceBetweenTwoVertices,
    [0, 0],
    isTarget
  )
})
