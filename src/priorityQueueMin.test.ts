import { log } from "console"
import { priorityQueueMin } from "./priorityQueueMin"

function makeQueue(priorities: number[]) {
  const queue = priorityQueueMin<string>()
  priorities.forEach((p) => queue.enqueue("A", p))
  return queue
}

it("should insert items properly in collection (min to max order)", () => {
  const arr = [100, 30, 29, 27, 24, 20, 19, 17, 12]
  const queue = makeQueue(arr)
  arr
    .sort((a, b) => a - b)
    .forEach((e, i) => {
      expect(queue.collection[i]).toEqual({ key: "A", priority: e })
    })
})

it("should remove first item properly from the collection", () => {
  const arr = [100, 30, 29, 27, 24, 20, 19, 17, 12]
  const queue = makeQueue(arr)
  let newCollection = queue.collection
  queue.dequeue()
  newCollection.shift()
  expect(queue.collection).toEqual(newCollection)
})
