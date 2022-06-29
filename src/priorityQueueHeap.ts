const { log } = console

/**
 * Priority queue with Heap
 * Goal is not to maintain an update a strict order list
 * but to be sure that:
 *  - (nodeIndex * 2) & (nodeIndex * 2 + 1) are smaller (or greater) than nodeIndex priority in heap
 *  - floor(nodeIndex / 2) is bigger than 
 * 
 * heap example after insertion:
 *     [
 *       null,
 *       { key: 'F', priority: 14 },
 *       { key: 'D', priority: 19 },
 *       { key: 'B', priority: 36 },
 *       { key: 'A', priority: 100 },
 *       { key: 'C', priority: 30 }
 *     ]
 * 
 * @doc: https://en.wikipedia.org/wiki/Heap_(data_structure)
 */
export function priorityQueueHeap<T>(type: "min" | "max" = "min") {
  const heap = [null]
  /**
   * enqueue
   * Insert value is priority in appropriate position in heap
   * @param key
   * @param priority
   */
  const enqueue = (key: any, priority: number): void => {
    const node = { key, priority }
    // push new node in heap (at the end of heap)
    // get new current node index (at the last position of heap array)
    // get parent index (is current (index / 2) AND floor to round down the value)
    heap.push(node)
    let nodeIndex = heap.length - 1
    let parentNodeIndex = Math.floor(nodeIndex / 2)

    while ( 
      type === "min"
      ? node.priority < heap?.[parentNodeIndex]?.priority
      : node.priority > heap?.[parentNodeIndex]?.priority
    ) {
      // invert parent node and node in heap
      // update there indexs
      const parentNode = heap[parentNodeIndex]
      heap[parentNodeIndex] = node
      heap[nodeIndex] = parentNode
      nodeIndex = parentNodeIndex
      parentNodeIndex = Math.floor(nodeIndex / 2)    
    }

    // log(heap)
  }

  /**
   * dequeue
   * Remove item from heap 
   * 
   * @returns
   */
  const dequeue = () => {
    if (heap.length < 3) {
      const toReturn = heap.pop()
      heap[0] = null
      return toReturn
    }

    // start 1 because 0 is 'null'
    const toRemove = heap[1]
    heap[1] = heap.pop()

    let currentIndex = 1
    let [left, right] = [2 * currentIndex, 2 * currentIndex + 1]
    let currentChildIndex = heap[right]?.priority <= heap[left].priority ? right : left

    while (
      heap[currentChildIndex] &&
      heap[currentIndex].priority >= heap[currentChildIndex].priority
    ) {
      heap[currentChildIndex] = heap[currentIndex]
      heap[currentIndex] = heap[currentChildIndex]
    }
    return toRemove
  }

  const isEmpty = (): boolean => {
    return heap.length === 0
  }

  return Object.freeze({
    enqueue,
    dequeue,
    isEmpty,
    heap,
  })
}
