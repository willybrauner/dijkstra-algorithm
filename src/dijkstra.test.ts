import { dijkstra } from "./dijkstra"
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

  const getNeighbors = ([y, x]) =>
    [
      [y - 1, x],
      [y + 1, x],
      [y, x + 1],
      [y, x - 1],
    ].reduce((a, [pY, pX]) => [...a, ...(matrix?.[pY]?.[pX] ? [[pY, pX]] : [])], [])

  const getCostBetweenVertices = (_, [y2, x2]) => matrix[y2][x2]

  const isTarget = (vertex) => vertex.every((coord, i) => coord === [9, 9][i])

  const distance = dijkstra<[number, number]>(
    getNeighbors,
    getCostBetweenVertices,
    [0, 0],
    isTarget
  )

  expect(distance).toBe(40)
})

it("should work with Object graph", () => {
  const graph = {
    start: { A: 5, B: 2 },
    A: { start: 1, C: 4, D: 2 },
    B: { A: 8, D: 7 },
    C: { D: 6, finish: 3 },
    D: { finish: 1 },
    finish: {},
  }

  const getNeighbors = (vertex) => Object.keys(graph[vertex])

  const distanceBetweenTwoVertices = (v1, v2) => graph[v1][v2]

  const isTarget = (vertex) => vertex === "finish"

  const distance = dijkstra<string>(
    getNeighbors,
    distanceBetweenTwoVertices,
    "start",
    isTarget
  )

  expect(distance).toBe(8)
})
