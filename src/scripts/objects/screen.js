const screen = {
    userProfile: document.querySelector(".profile-data"),
    renderUser(user) {
        this.userProfile.innerHTML = 
        `<div class="info">
            <img src="${user.avatarUrl}" alt="foto do perfil do usuário" />
            <div class="data">
                <h1>${user.name ?? "Não possui nome cadastrado"}</h1>
                <div class="data-follows">
                    <h4>seguidores: ${user.followers}</h4>
                    <h4>seguindo: ${user.following}<h4>
                </div>
                <p>${user.bio ?? "Não possui bio cadastrada"}</p>
            </div>
        </div>`

        let repositoriesItems = '';
        user.repositories.forEach(repo => {
            repositoriesItems += `
            <li>
                <a href="${repo.html_url}" target="_blank">
                    ${repo.name}
                    <ul class="repo-counters">
                        <li>🍴${repo.forks_count ? repo.forks_count: ' sem forks'}</li>
                        <li>✨${repo.stargazers_count ? repo.stargazers_count: ' sem estrelas'}</li>
                        <li>👀${repo.watchers_count ? repo.watchers_count: ' sem visitantes'}</li>
                        <li>🐱‍👤${repo.language ? repo.language: ' sem linguagem'}</li>
                    </ul>
                </a>
            </li>`
        })

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += 
            `<div class="repositories section">
                <h2>Repositórios</h2>
                <ul>${repositoriesItems}</ul>
            </div>`
        }

        let eventItems = ''
        user.events.forEach(event => {
            if (event.type === 'PushEvent') {
                eventItems += `<li><span>${event.repo.name}</span> 
                - ${event.payload.commits[0].message.slice(0, 60)}.</li>`
            } else if (event.type === 'CreateEvent') {
                eventItems += `<li><span>${event.repo.name}</span> 
                - foi criado um ${event.payload.ref_type}.</li>`
            }else{
                eventItems += `<li><span>${event.repo.name}</span> 
                - evento não disponivel</li>`
            }
        })

        if (user.events.length > 0) {
            this.userProfile.innerHTML += 
            `<div class="events section">
                <h2>Eventos</h2>
                <ul>${eventItems}</ul>
            </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h2>Usuário não encontrado</h2>"
    }
}

export { screen }