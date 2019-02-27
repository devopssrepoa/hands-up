new Vue({
    el: '#app',
    data() {
        return {
            handList: null,
            who: ''
        }
    },
    methods: {
        requestRemove: function (event, who, confirm) {
            if (confirm == true) {
                this.$dialog.confirm({
                    message: 'Remove from Queue?',
                    onConfirm: () => this.modify(event, 'drop', who, this)
                });
                return 
            }
            this.modify(event, 'drop', who, this);
        },
        modify: function (event, action, who, context) {

            var bodyFormData = new FormData();
            bodyFormData.set('who', who);
            axios({
                method: 'post',
                url: `/api/hands/${action}`,
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
            if (this.handList !== null && this.handList.indexOf(document.getElementById('who').value) != -1) {
                this.$toast.open({
                    message: "You can't impersonate someone from the queue!",
                    type: 'is-danger'
                })
                return;
            }
            
            this.who = document.getElementById('who').value;
        }
    },
    mounted: function () { 
        this.getHands();

        setInterval(function () {
            this.getHands();
          }.bind(this), 1000); 
    }
})