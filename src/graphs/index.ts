class Graph {
  adjacencyList: { [key: string]: string[] }

  constructor() {
    this.adjacencyList = {}
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = []
  }

  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) return
    this.adjacencyList[vertex1].push(vertex2)
    this.adjacencyList[vertex2].push(vertex1)
  }

  removeEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) return
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter((v) => v !== vertex2)
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter((v) => v !== vertex1)
  }

  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) return
    this.adjacencyList[vertex].forEach((v) => {
      this.removeEdge(vertex, v)
    })
    delete this.adjacencyList[vertex]
  }

  depthFirstRecursive(start) {
    const result = []
    const visited = {}
    const adjacencyList = this.adjacencyList

    function dfs(vertex) {
      if (!vertex) return null
      visited[vertex] = true
      result.push(vertex)
      adjacencyList[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          return dfs(neighbor)
        }
      })
    }

    dfs(start)

    return result
  }

  depthFirstIterative(start) {
    const stack = [start]
    const result = []
    const visited = {}
    let currentVertex

    visited[start] = true
    while (stack.length) {
      currentVertex = stack.pop()
      result.push(currentVertex)

      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true
          stack.push(neighbor)
        }
      })
    }

    return result
  }

  breadthFirst(start) {
    const queue = [start]
    const result = []
    const visited = {}
    let currentVertex
    visited[start] = true

    while (queue.length) {
      currentVertex = queue.shift()
      result.push(currentVertex)

      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true
          queue.push(neighbor)
        }
      })
    }

    return result
  }

  // The shortest path between two vertices
  shortestPath(start, end) {
    const queue = [start]
    const result = []
    const visited = {}
    const distances = {}
    const previous = {}
    let currentVertex
    let path = []

    visited[start] = true
    distances[start] = 0
    while (queue.length) {
      currentVertex = queue.shift()

      if (currentVertex === end) {
        while (previous[currentVertex]) {
          path.push(currentVertex)
          currentVertex = previous[currentVertex]
        }
        break
      }

      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true
          queue.push(neighbor)
          distances[neighbor] = distances[currentVertex] + 1
          previous[neighbor] = currentVertex
        }
      })
    }

    return path.concat(start).reverse()
  }

  // The shortest distance between two vertices
  shortestDistance(start, end) {
    const queue = [start]
    const visited = {}
    const distances = {}
    let currentVertex

    visited[start] = true
    distances[start] = 0
    while (queue.length) {
      currentVertex = queue.shift()

      if (currentVertex === end) {
        return distances[currentVertex]
      }

      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true
          queue.push(neighbor)
          distances[neighbor] = distances[currentVertex] + 1
        }
      })
    }

    return -1
  }

  // The number of edges between two vertices
  distance(start, end) {
    const queue = [start]
    const visited = {}
    const distances = {}
    let currentVertex

    visited[start] = true
    distances[start] = 0
    while (queue.length) {
      currentVertex = queue.shift()

      if (currentVertex === end) {
        return distances[currentVertex]
      }

      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true
          queue.push(neighbor)
          distances[neighbor] = distances[currentVertex] + 1
        }
      })
    }

    return -1
  }

  // The number of vertices between two vertices
  vertices(start, end) {
    const queue = [start]
    const visited = {}
    const distances = {}
    let currentVertex

    visited[start] = true
    distances[start] = 0
    while (queue.length) {
      currentVertex = queue.shift()

      if (currentVertex === end) {
        return distances[currentVertex]
      }

      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true
          queue.push(neighbor)
          distances[neighbor] = distances[currentVertex] + 1
        }
      })
    }

    return -1
  }

  // The number of paths between two vertices
  paths(start, end) {
    const queue = [start]
    const visited = {}
    const paths = {}
    let currentVertex

    visited[start] = true
    paths[start] = 1
    while (queue.length) {
      currentVertex = queue.shift()

      if (currentVertex === end) {
        return paths[currentVertex]
      }

      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true
          queue.push(neighbor)
          paths[neighbor] = paths[currentVertex] + 1
        }
      })
    }

    return -1
  }

  // The number of cycles between two vertices
  cycles(start, end) {
    const queue = [start]
    const visited = {}
    const cycles = {}
    let currentVertex

    visited[start] = true
    cycles[start] = 0
    while (queue.length) {
      currentVertex = queue.shift()

      if (currentVertex === end) {
        return cycles[currentVertex]
      }

      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true
          queue.push(neighbor)
          cycles[neighbor] = cycles[currentVertex] + 1
        }
      })
    }

    return -1
  }

  // The number of connected components
  connectedComponents() {
    const visited = {}
    const components = []
    for (let vertex in this.adjacencyList) {
      if (!visited[vertex]) {
        const component = this.breadthFirst(vertex)
        component.forEach((v) => (visited[v] = true))
        components.push(component)
      }
    }

    return components
  }

  // The number of connected components
  connectedComponentsCount() {
    const visited = {}
    let count = 0
    for (let vertex in this.adjacencyList) {
      if (!visited[vertex]) {
        this.breadthFirst(vertex).forEach((v) => (visited[v] = true))
        count++
      }
    }

    return count
  }
}

export default Graph
