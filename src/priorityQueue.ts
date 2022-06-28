/**
 * Priority queue
 */
export function priorityQueue<T>() {
  const collection: [T, number][] = []
  const isEmpty = (): boolean => collection.length === 0
  const enqueue = (element: [T, number]): void => {
    if (isEmpty()) {
      collection.push(element)
    } else {
      let added = false
      for (let i = 1; i <= collection.length; i++) {
        if (element[1] < collection[i - 1][1]) {
          collection.splice(i - 1, 0, element)
          added = true
          break
        }
      }
      if (!added) {
        collection.push(element)
      }
    }
  }
  const dequeue = (): [T, number] | undefined => {
    let value = collection.shift()
    return value
  }
  return Object.freeze({
    isEmpty,
    dequeue,
    enqueue,
    collection
  })
}
