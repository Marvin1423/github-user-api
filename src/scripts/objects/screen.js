const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = 
        `<div class="info">
            <img src="${user.avatarUrl}" alt="User profile image" />
            <div class="data">
                <h1>${user.name ?? 'No username registered'}</h1>
                <p>${user.bio ?? 'No bio registered'}</p>

                <div class="followInfo">
                    <p>followers: ${user.followers}</p>
                    <p>following: ${user.following}</p>
                </div>
            </div>
        </div>`

        let repositoriesItems = ''
        
        user.repositories.forEach(repo => repositoriesItems += 
        `<li>
            <a href="${repo.html_url}" target="_blank">
                ${repo.name}
                <ul class="repo-info">
                    <li class="repo-info-items">🍴${repo.forks}</li>
                    <li class="repo-info-items">⭐${repo.stargazers_count}</li>
                    <li class="repo-info-items">👀${repo.watchers}</li>
                    <li class="repo-info-items">👨‍💻${repo.language ?? 'sem linguagem'}</li>
                </ul>
            </a>
        </li>`)

        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItems}</ul>
                                            </div>`
        }

        let eventsItems = ''

        user.events.forEach(event => {
            const isPushEvent = event.type === "PushEvent";
            eventsItems += `<li><span>${event.repo.name}</span> - ${isPushEvent ? event.payload.commits[0].message.slice(0, 60) : "Repositório criado/atualizado"}</li>`
        })

        if(user.events.length > 0){
            this.userProfile.innerHTML += `<div class="events">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItems}</ul>
                                            </div>`
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h2>Usuário não encontrado</h2>"
    }
}
export { screen }
