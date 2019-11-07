


let vm=new Vue({
  el: '#app',
  data:{
    errors: [],
     name: null,
     login: null,
     profession: null,
     school:null,
     password:null
  },
  methods:{

    checkForm: function (e) {
     this.errors = [];
     if (!this.password) {
       this.errors.push("Password required.");
     }
     if (!this.profession) {
       this.errors.push("Profession required.");
     }
     if (!this.school) {
       this.errors.push("School required.");
     }
     if (!this.name) {
       this.errors.push("Name required.");
     }
     if (!this.login) {
       this.errors.push('Login required.');
     }/* else if (!this.validEmail(this.profession)) {
       this.errors.push('profession required.');
     }*/

     if (!this.errors.length) {
       return true;
     }
     e.preventDefault();
   },
   validEmail: function (profession) {
     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(profession);
   }

  }

})
let vm1=new Vue({
  el: '#app1',
  data:{
    errors: [],
     login: null,
     password:null
  },
  methods:{

    checkLogin: function (e) {
     this.errors = [];
     if (!this.password) {
       this.errors.push("Password required.");

     }else if (this.password.length<6) {
       this.errors.push("Password required should have more than 6 caracters.");

     }

     if(!this.login) {
       this.errors.push('Login required.');
     }
     


     if (!this.errors.length) {
       return true;
     }
     e.preventDefault();

   },

 }
})
