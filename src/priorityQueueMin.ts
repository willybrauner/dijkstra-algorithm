import { TItemKey } from "./types"

/**
 * Priority queue
 * "naive" solution is building a sorted list of element
 *  [
 *       { key: 'F', priority: 2 },
 *       { key: 'D', priority: 19 },
 *       { key: 'C', priority: 30 }
 *       { key: 'B', priority: 66 },
 *       { key: 'A', priority: 100 },
 *  ]
 *
 * When a new item is enqueued to the collection
 * we have to iterate on each collection item to find the right position
 * of our new item.
 * 
 * Perf: O(n)
 *
 */
export function priorityQueueMin<K = any>() {
  const collection: TItemKey<K>[] = []
  const isEmpty = (): boolean => collection.length === 0
  const enqueue = (key: K, priority: number): void => {
    if (isEmpty()) {
      collection.push({ key, priority })
    } else {
      let added = false
      for (let i = 1; i <= collection.length; i++) {
        if (priority < collection[i - 1].priority) {
          collection.splice(i - 1, 0, { key, priority })
          added = true
          break
        }
      }
      if (!added) {
        collection.push({ key, priority })
      }
    }
  }

  const dequeue = (): TItemKey<K> => {
    let value = collection.shift()
    return value
  }
  return Object.freeze({
    isEmpty,
    dequeue,
    enqueue,
    collection,
  })
}
