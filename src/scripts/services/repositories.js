import { baseUrl, repositoriesQuantity } from '/src/scripts/variables.js'

async function getRepositories(userName){
    const response = await fetch(`${baseUrl}/${userName}/repos`)
    const repositories = await response.json()
    return repositories.slice(0, repositoriesQuantity)
}

export { getRepositories }