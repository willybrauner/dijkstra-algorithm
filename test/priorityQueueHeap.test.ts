import { priorityQueueHeap } from "../src/priorityQueueHeap"

const queue = priorityQueueHeap("min")

it("should insert item properly in heap", () => {
  ;[100, 30, 29, 27, 24, 20, 19, 17, 12].forEach((e) => {
    queue.enqueue("A", e)
  })
  console.log(queue.heap)

  for (let index = 1; index < Math.floor(queue.heap.length / 2); index++) {
    expect(queue.heap[index * 2].priority).toBeGreaterThan(queue.heap[index].priority)
    expect(queue.heap[index * 2 + 1].priority).toBeGreaterThan(queue.heap[index].priority)
  }
})

it("should remove item properly from heap", () => {
  
  // last item become the first  
  const firstHeapItem = queue.heap[1]
  const item = queue.dequeue()
  expect(item.priority).toBe(firstHeapItem.priority)
  console.log(queue.heap)

//   for (let index = 1; index < Math.floor(queue.heap.length / 2); index++) {
//       expect(queue.heap[index * 2].priority).toBeGreaterThan(queue.heap[index].priority)
//       expect(queue.heap[index * 2 + 1].priority).toBeGreaterThan(queue.heap[index].priority)
//     }
})
