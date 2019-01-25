new Vue({
    el: '#app',
    data() {
        return {
            handList: null,
            who: '',
            newWho: '',
        }
    },
    methods: {
        requestRemove: function (event, who, confirm) {

            var vueStuff = this;

            if (confirm == true) {
                this.$dialog.confirm({
                    message: 'Remove from Queue?',
                    onConfirm: () => this.remove(event, who, this)
                });
            } else {
                this.remove(event, who, this);
            }
        },
        remove: function (event, who, context) {
            var vueStuff = context;
        
            var bodyFormData = new FormData();
            bodyFormData.set('who', who);
            axios({
                method: 'post',
                url: '/api/hands/drop',
                data: bodyFormData,
                config: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        add: function (event, who) {

            var vueStuff = this;

            var bodyFormData = new FormData();
            bodyFormData.set('who', who);
            axios({
                method: 'post',
                url: '/api/hands/rise',
                data: bodyFormData,
                config: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getHands: function (event) {
            axios
            .get('/api/hands')
            .then(response => (this.handList = response.data.hands))
            .catch(error => console.log(error))
        },
        saveWho: function () {
            if (this.newWho !== localStorage.who) {
                if (this.handList !== null && this.handList.indexOf(this.newWho) != -1) {
                    this.$toast.open({
                        message: "You can't impersonate someone from the queue!",
                        type: 'is-danger'
                    })
                } else {
                    localStorage.who = this.newWho;
                    if (this.handList !== null && this.handList.indexOf(this.who) != -1) {
                        this.remove(event,this.who,this);
                    }
                    this.who = localStorage.who;
                }
            }
        }
    },
    mounted: function () { 
        this.getHands();
        
        if (localStorage.who) {
            this.who = localStorage.who;
            this.newWho = localStorage.who;
          }

        setInterval(function () {
            this.getHands();
          }.bind(this), 1000); 
    }
})