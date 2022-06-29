import { priorityQueueHeap } from "../src/priorityQueueHeap"

it("should work with heap", () => {
  const queue = priorityQueueHeap("min")
  queue.enqueue("A", 100)
  queue.enqueue("A", 30)
  queue.enqueue("A", 29)
  queue.enqueue("A", 27)
  queue.enqueue("A", 24)
  queue.enqueue("A", 20)
  queue.enqueue("A", 19)
  queue.enqueue("A", 17)
  queue.enqueue("A", 12)

  console.log(queue.heap)

  for (let index = 1; index < Math.floor(queue.heap.length / 2); index++) {
    expect(queue.heap[index * 2].priority).toBeGreaterThan(queue.heap[index].priority)
    expect(queue.heap[index * 2 + 1].priority).toBeGreaterThan(queue.heap[index].priority)
  }
})
