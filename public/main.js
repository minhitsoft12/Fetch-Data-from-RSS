const url = 'https://vnexpress.net/rss/suc-khoe.rss';

const getData = function () {
    feednami.load(url).then((data) => {
        let news = data.entries.sort((a, b) => {
            let keyA = new Date(a.pubDate)
            let keyB = new Date(b.pubDate)
            if (keyA < keyB) return 1
            if (keyA > keyB) return -1
            return 0
        }).slice(0, 20)
        render(news)
    })
}
getData()
// setInterval(getData,5000)


document.querySelector('#form').addEventListener('submit' , (e) => {
    e.preventDefault();
    const startD = document.querySelector('#start').value
    const endD = document.querySelector('#end').value

    if(startD !== '' && endD !== '') {
        feednami.load(url).then((data) => {
            const filterNews = data.entries.filter((a) => {
                return new Date(a.pubDate).getTime() > new Date(startD).getTime() && new Date(a.pubDate).getTime() < new Date(endD).getTime()
            })
            const finalArticles = filterNews.sort((a,b) => {
                const dateA = new Date(a.pubDate)
                const dateB = new Date(b.pubDate)
                if(dateA < dateB) return 1
                if(dateA > dateB) return -1
                return 0;
            }).slice(0,20)
            document.querySelector('.articles').innerHTML = ''
            render(finalArticles)
        })
    }else {
        alert('empty')
    }
})

function render(array) {
    for (let d of array) {

        const div = document.createElement('div')
        const h3 = document.createElement('h3')
        const inner = document.createElement('div')
        const time = document.createElement('p')
        const a = document.createElement('a')

        div.classList.add('item', 'col-md-6','col-12')

        h3.innerHTML = `${d.title}`
        inner.innerHTML = d.description
        time.innerHTML = new Date(d.pubDate)
        a.innerText = 'More'
        a.href = d.link

        div.appendChild(h3)
        div.appendChild(time)
        div.appendChild(inner)
        div.appendChild(a)
        document.querySelector('.articles').append(div)

        document.querySelectorAll('a').forEach(link => {
            link.setAttribute('target' , '_blank')
        })
    }
}