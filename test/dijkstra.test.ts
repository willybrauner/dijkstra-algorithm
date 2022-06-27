import { dijkstra } from "../src/dijkstra"
import { is, Record, RecordOf } from "immutable"
const { log } = console


type Coords = RecordOf<{ x: number, y: number }>
let mkCoords: Record.Factory<{ x: number, y: number }> = Record({ x: null, y: null })

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

  function getNeighbors(c: Coords): Coords[] {
    let result = [c.set('y', c.y - 1), c.set('y', c.y + 1), c.set('x', c.x - 1), c.set('x', c.x + 1)];
    return result.filter(c => c.y >= 0 && c.y < 10 && c.x >= 0 && c.x < 10);
  }

  const distanceBetweenTwoVertices = (_: Coords, c: Coords) => matrix[c.y][c.x]

  const target = mkCoords({ x: 9, y: 9 })

  const isTarget = (coords: Coords) => is(coords, target)

  const distance = dijkstra<Coords>(
    getNeighbors,
    distanceBetweenTwoVertices,
    mkCoords({ y: 0, x: 0 }),
    isTarget
  )
  log(distance)
})
