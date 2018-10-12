class dbaccess {
    
    constructor(dob,name){

    var admin = require('firebase-admin');
    var serviceAccount = require('./serviceAccountKey.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'test-167e0',
    clientEmail: 'firebase-adminsdk-rzw2o@test-167e0.iam.gserviceaccount.com',
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJH0fsTFzNdsXz\nnRQboCGoDEhlW05pjtlU6Veg1bHMBAtVMy5OsTdz5VlucYrLEmogCfU2Q7vV8BjC\nP5piuyHeMqZx/9mArkxkKRI3Fd2TO9KMIYfVwWq85njJaGqUprT6GNKVIonkBSe6\nCGu8btlIisq3k0AtXdyeo8uEZkIlGNKmINGnyLepw+LFWJZ7eCk7nJuoUAp6q1s+\n5vrVejslyQWCHvCZ7BiQ6Hz4bJfAsYq6FBZtOImKV6a18y4AzZ/zylg63C6/8WYR\nomv1OuVppPmirDE0gUdmozOaDpTv5TLc/ib5OmpID1hy1w0GajIZ+OvxOBxgpnd1\nN9RyOOxXAgMBAAECggEAWN4Hi7PaNbdLlG9N2T8SYAy9WHvV0/KYuVo5rAmAfGM1\nFrp8tay8kes/bvuglkZWuj1sKkQXlVp3ti0gbIu/VU0QGsMwOhnKC1/SeqCgvVPr\nnpuaR6slHL7BlE0c+v4GbZPWSKtwPl7AxQS/hg182P7qv97CtskImNhLLv94LqdW\nYyH5P5NP6O3ZcEl3lBJPtiv/Z6pR1pBzfxblpKrLsk8Zd3gNu2P5oxlLA1vduhaQ\nVTo54l3HYcJUJysFoPJJB4v+61LCFCIb33MXazDCMMqQeF+LuKrvQd/cVS1osulC\nmCgl4LmrwgModEf3Nx0aXneEjxE+pijLA/6auYR7wQKBgQDwMdDHtcRoKHQ2sSi6\neSOhpr2G9zf7RaQQI4u1Kb70N6YwGtrGJsUXwvEfHYUBWjZqkzeGyyiS4VijK9sV\nIawCVIvGFyS6JrPs/2APVNnJv1fI+HtXT9WtNlgmz56ZeS3NHJDJZ4tma9LgJOSa\nQE8vRrvmtui4LxVPMFWrqAIcsQKBgQDWW0YCrryMgG3nLzsEZWWF060VVM2BArBS\nM28smnQb1RfSCfyZ4QX3Y44cqQl9WNi0y8Pne83beJ/Eq8iGz5u8sEwcNvlN0ReQ\ntuTkv5EQVfmnqnS1iigX5E8Y1wLAY7E2rEO6GkEEyFHOd8as2H2fDmq73XPQ+JY4\npvZKmC87hwKBgQCkYUND2cafjcfywg1giJT1BTrByiC6yu87yEfNZNN1KTyHwWkl\noNTTrSr9I2OqCEYja7rded27n5LcoJ/fd1rTgW7i02XkK6aJNEBWXbhqlJOMS1mF\n6HIQh5eOgBpHaCILNFh2LXG+V15K3ZTBZ++JKDxh6Z2cp0RLHIYU4vcHEQKBgQDT\noB0IfPbNR+Y5PdnoRyrp6seQrb6NxdfJ79mskXhcGg+AYDewvAYl7XXaOdCSneqk\n5B8vJH1iVj517pr07XZ13R/nIycSeoHnb4mfhLl1BUyLCbBbomBe5hppDa07v7Cv\np3bd/xl93T9Wtc3By6KKK7OYcdPr1eCJYdz6XDEVdQKBgDHZhQOYuXH5lBE34exw\nRyULAq0foECHbq+t9aaj+fLOZUBZULneH8bpNWup0WnsOXIrE9XTqs6yxfD6jD44\nmXMq0iWTZzenj62YgECkbc1LgjQInt38yOXU5onRYRFiRZZ91MEBKR2/9shWSg/e\nTrRrjxUb24R64F3DD6x2kw7D\n-----END PRIVATE KEY-----\n',
    databaseURL: 'https://test-167e0.firebaseio.com'
});

var db = admin.database();
var ref = db.ref("server/saving-data/fireblog");
var usersRef = ref.child(name);
//var username = a;    
 
    usersRef.set({
       user: {
            // date_of_birth: "June 23, 1912",
            // full_name: "Alan Turing"
            date_of_birth: dob,
            full_name: name
        }
    });
   

    }

  

}
module.exports = dbaccess;

