import {priorityQueueHeap} from "../src/priorityQueueHeap"

it('should work with heap', ()=> {
    
    const queue = priorityQueueHeap()
    queue.enqueue(["A", 10])
    queue.enqueue(["B", 20])
    queue.enqueue(["D", 25])
    queue.enqueue(["C", 5])

    expect(queue.heap).toStrictEqual(
        [
            // null,
            // {priority: 5, value: "C"}, 
            // {priority: 10, value: "A"},
            // {priority: 20, value: "B"},
            // {priority: 25, value: "D"},
        ]
    )

})