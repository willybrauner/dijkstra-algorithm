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

  const getNeighbors = (vertex, graph = matrix) => {
    const [y, x] = vertex[0]
    const up = graph?.[y - 1]?.[x]
    const down = graph?.[y + 1]?.[x]
    const prev = graph?.[y]?.[x - 1]
    const next = graph?.[y]?.[x + 1]

    return [
      ...(up ? [[y - 1, x], up] : []),
      ...(down ? [[y + 1, x], down] : []),
      ...(next ? [[y, x + 1], next] : []),
      ...(prev ? [[y, x - 1], prev] : []),
    ]
  }

  const costBetweenTwoVertices = (a, b) => {}

  const isTarget = (a) => {}

  type TCoord = [number, number]
  type TCost = number
  type TVertex = [TCoord, TCost][]

  const distance = dijkstra<TVertex[]>(
    getNeighbors,
    costBetweenTwoVertices,
    [0, 0],
    isTarget
  )
})
