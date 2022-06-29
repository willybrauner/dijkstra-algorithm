import { log } from "console";
import { priorityQueueHeap } from "../src/priorityQueueHeap"

function dump(queue) {
  function dumpAt(i) {
    log('  '.repeat(Math.log2(i)) + queue.heap[i].priority)
    if (i*2 < queue.heap.length) dumpAt(2*i)
    if (i*2+1 < queue.heap.length) dumpAt(2*i+1)
  }
  dumpAt(1)
}

function makeQueue(priorities: number[]) {
  const queue = priorityQueueHeap("min")
  priorities.forEach(p => queue.enqueue("A", p))
  return queue;
}

function checkInvariant(queue) {
  for (let i = 1; i <= Math.floor(queue.heap.length / 2); i++) {
    if (i*2 < queue.heap.length) {
      expect(queue.heap[i * 2].priority).toBeGreaterThan(queue.heap[i].priority)
    }
    if (i*2+1 < queue.heap.length) {
      expect(queue.heap[i * 2 + 1].priority).toBeGreaterThan(queue.heap[i].priority)
    }
  }
}

it("should insert item properly in heap", () => {
  const queue = makeQueue([100, 30, 29, 27, 24, 20, 19, 17, 12]);
  checkInvariant(queue);
})

it("should remove item properly from heap", () => {
  const queue = makeQueue([100, 30, 29, 27, 24, 20, 19, 17, 12]);
  log('before dequeue:')
  dump(queue)
  const item = queue.dequeue()
  log('after dequeue:')
  dump(queue)
  expect(item.priority).toBe(12);
  checkInvariant(queue);
})
