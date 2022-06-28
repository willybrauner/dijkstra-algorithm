const {log} = console

/**
 * Priority queue with Heap
 */
export function priorityQueueHeap<T>() {
  const heap = [null]

  /**
   * enqueue
   * @param value 
   * @param priority 
   */
  const enqueue = ([value, priority]): void => {
    // create a new node 
    const newNode = { value, priority }
    // push new node in heap (at the end of heap)
    heap.push(newNode)
    // get new current node index
    let currentNodeIndex = heap.length - 1
    // get parent index (is current index / 2 AND floor to round up the value)
    let currentNodeParentIndex = Math.floor(currentNodeIndex / 2)
    
    log('currentNodeParentIndex',currentNodeParentIndex)

    // utils parentNode exists AND newNode priority is smallest than parentNode priority
    while(
      heap[currentNodeParentIndex]
      &&
      newNode.priority < heap[currentNodeParentIndex].priority
    ){
      log('icic')
      const parentNode = heap[currentNodeParentIndex]
      // set nodes on new position
      // parent takes new node
      heap[currentNodeParentIndex] = newNode
      // current takes parent node 
      heap[currentNodeIndex] = parentNode
      // update indexs
      currentNodeIndex = currentNodeParentIndex
      currentNodeParentIndex = Math.floor(currentNodeIndex / 2)      
    }
  }


  /**
   * dequeue
   * @returns 
   */
  const dequeue = () => 
  {
    if (heap.length < 3) {
      const toReturn = heap.pop();
      heap[0] = null;
      return toReturn;
    }

    // start 1 because 0 is 'null'
    const toRemove = heap[1];
    heap[1] = heap.pop();

    let currentIndex = 1;
    let [left, right] = [2*currentIndex, 2*currentIndex + 1];
    let currentChildIndex = heap[right]?.priority <= heap[left].priority ? right : left;

    while (
      heap[currentChildIndex] 
      && 
      heap[currentIndex].priority >= heap[currentChildIndex].priority
    ){
      heap[currentChildIndex] = heap[currentIndex];
      heap[currentIndex] = heap[currentChildIndex];
    }
    return toRemove;
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
