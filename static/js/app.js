new Vue({
    el: '#app',
    data () {
      return {
        handList: null,
        counter: 0
      }
    },
    mounted () {
      axios
        .get('http://localhost:3000/api/hands')
        .then(response => (this.handList = response.data.hands))
        .catch(error => console.log(error))
    },
    methods: {
        remove: function (event, who) {
            var bodyFormData = new FormData();
            bodyFormData.set('who', who);
            axios({
                method: 'post',
                url: '/api/hands/drop',
                data: bodyFormData,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
              var index = this.handList.indexOf(who);
              if (index > -1) {
                this.handList.splice(index, 1);
              }
        }
    }
})