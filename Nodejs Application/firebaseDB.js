class firebaseDB{
    
    constructor(){
       
    }

    initDB(){
        var admin = require('firebase-admin');
        var serviceAccount = require("./serviceAccountKey.json");
        
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          projectId: 'skype-notifier-bot',
          private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQClmMogHxkBViiG\n4s9y69KSUJyqoHc8qxIxRrK156+wQyHqPcCvWdRDYPKKYrWvn79B8ufkiR0VC/Wk\nlt0pDWK3Ku305C0Em0NaO2Q9mm1wrSnNLl6BaTl+WxnB6Y6s/tpkoTC8vIB7TnNR\nzsZv+/keGlW7pfzYaaeZUjDmGpjxqveuWQknRZXXf3r1UCL0Q0+nFezr2FzbdEFP\nhh5ErQIy4wJ/ggRiDq/FnyjlZyZ9ZIZ5ukV6s1RYqcFBwxDVt6IhaB3c6SZqW8mH\npjQP9brvxWofMWAsQOjRSz54/uhyTMYWAQtMJTWNg5rc6iVhb03/4z2y9i9LqVHn\nOpO81sBNAgMBAAECggEABx9Q9Dw6LFlLEXAgaYo0ipf+gQU5U6ns9KMcjR/bqdpd\nU1CYIMKdk09QZzzTISxfAsRijm0KS+0xgcR+WyVo/UVSqkGFISlXZoJe75pcgifk\ngB9yL6E5uJJNA47a1Nx6QrE/IiL+aK9JXPemh8r/3jhWPyWmwB0dOQY0tbTnpp84\n3FM5L9oyKf5enjrUbfel2zPIEIli8cC0legWfayR9EbjajrGFPralw/BC+JCP4TF\nF8CATT1eswyCWApHuYW0/1Zbyaplw2jkP2vf1ZwIRBdm0eI/yXwP8vEBlroSZwEj\nCggWMpaB6fjbloVhL0UOBX/LEK2sz42O/q526v3kYQKBgQDbRmEMW1sCgawmfttF\n4XhBrTUvvsrseuGe4uygjCDqgPV1D9yX9ByxFAbu9iZ7ZdzB8fY8JmtAiZ6dfkWT\nCkpJeTbPBLOBOvR9rsYdePHoI3fyuStPSD2BT2FmSul3ff+faryk2PI44HONJXzs\nLh0DyUFyDxiYrpDKTWYziJT9YQKBgQDBVOlXc32W7ZslugJHdxjnWHo/Ij/SxLvt\nUXODyDVNUM9Qh8O6sZEg6wHdA0YDxookQMf1pQz7RZ0BytXbuIrt5MKb+LqofrLG\nxFDum5FsekbMlbiJBltqUpPP5OnQIIzP65RNJAIDDtoCjn4HfEYdwH3TIqbY6h+W\nLbBbQiWebQKBgQCIC1lpBkEoA/YgCDLZX3NyJBnMnq5eHDthjd9MGMTPWeVwlL/D\nk1Q91XQbzKLBish1mD6ywQ9oAjpj8pUODqNahJcpx/vrIP3SAJ6waHqGEYN5F8O0\nM9jdIrgGdFH3rjfr25hhGqzl9vQaTXj9O/sKf1JYht8204/HxE+1h3cQ4QKBgQCX\n5wSUXrzt6nE9mkISLsSVeVJL6rgk/cj+tUHC6Hrg7b6GcrXaKYxzRdMn+Vt4ufVu\neKvkGTPy9gZgEyQnSH94XYZ/EFZw72O+gx9n6zm+9vBL7NOabjFDf/B9p0oC6qBY\n+auDVOhzyKaI3bauYPmihM0YKKDZzFLXJ7zqZzWxnQKBgQC7yd60nxIj9UwFdJGw\nIrXyoFEcdhsA1E89aaDgcbAWXb0Fcxc2e+CATecgpd7ZLjbEBpFH2LEQ1FOoFNrX\nRAfkUyIhA+kMF/xR88TuMRHR8Bj6b6M5PmYE+0ICuxg7Ps5Jj+B0dbIXW6eEUViL\nu7JvSi0o9Pisb2oLAlSFNvxcFQ==\n-----END PRIVATE KEY-----\n",
          databaseURL: "https://skype-notifier-bot.firebaseio.com"
        });
        var db = admin.database();
        var ref = db.ref("projects");
        var usersRef = ref.child("dID");
        usersRef.set({
            
            person: {
                date_of_birth: "March 23, 1995",
                full_name: "Malith Wijeseakra"
            },
              gracehop: {
                date_of_birth: "December 9, 1906",
                full_name: "Grace Hopper"
              },
              Sinamaris: {
                date_of_birth: "February, 1999",
                full_name: "Sinamaris"
              },
              Jamis: {
                date_of_birth: "February, 1999",
                full_name: "Jamis bond"
              }
            });
            
    }
}
module.exports = AngularDB;