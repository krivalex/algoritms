import Graph from './graphs/index.js'

const graph = new Graph()
graph.addVertex('A')
graph.addVertex('B')
graph.addVertex('C')
graph.addVertex('D')

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('B', 'D')
graph.addEdge('C', 'D')

console.log(graph.adjacencyList)

console.log(graph.depthFirstRecursive('A'))
console.log(graph.depthFirstIterative('A'))

console.log(graph.connectedComponents())

console.log(graph.shortestPath('A', 'D'))
console.log(graph.shortestDistance('A', 'C'))

console.log(graph.breadthFirst('A'))

console.log(graph.adjacencyList)
