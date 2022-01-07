const App = new Vue({
    el: '#app',
    data() {
        return {
            serverList: [],
            client: ''
        }
    },
    methods: {
        async createServer() {
            console.log(this.client)
            let data = {
                client: this.client,
            }
            this.client = ''
            let res = await fetch('/api/server', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const newList = await res.json()
            this.serverList.push(newList)
        },
        async removeElement(id) {
            await fetch(`/api/server/${id}`, {
                method: 'DELETE'
            })
            this.serverList = this.serverList.filter(e => e.id !== id)
        }
    },
    async mounted() {
        const res = await fetch('/api/server');

        this.serverList = await res.json();
        console.log(this.serverList)
    }
})
