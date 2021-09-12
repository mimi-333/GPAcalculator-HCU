new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data(){
        return{
            img: [''],
            renderFlag: false
        };
    },
    methods:{
        registerFiles(files){
            console.log("meow");
            if(files){
                // filesは配列？
                console.log("meow-file-get");

                this.renderFlag = false
                this.img.splice(0);
                // ループ処理でやらなきゃ？
                for(let i = 0; i < files.length; i++){
                    const reader = new FileReader();
                    reader.onload = f => {
                        this.img.push(f.target.result);
                    };
                    reader.readAsDataURL(files[i]);
                }
                this.renderFlag = true;
                console.log("meow-file-read");
                console.log(this.img);
            }
        }
    }
})