const Semester = function(){
    this.sum = 0;
    this.秀 = 0;
    this.優 = 0;
    this.良 = 0;
    this.可 = 0;
};

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    computed:{
        search_pattern: () => {
            return new RegExp('(前期|後期).+(\\d+\.\\d+).+年生\\s*(不?可\\*?|良|優|秀)', 'g')
        },
        items: () => {return [1,2,3]}
    },
    data(){
        return{
            target_text: ""
        };
    },
    methods:{
        analyze(){
            const matches = this.target_text.matchAll(this.search_pattern);

            const sem = [new Semester(), new Semester()];
            for (const match of matches) {
                let idx = 0;
                if(match[1] !== "前期"){
                    idx = 1;
                }

                sem[idx].sum += parseFloat(match[2]);
                switch(match[3]){
                case "秀":
                    sem[idx].秀 += parseFloat(match[2]);
                    break;
                case "優":
                    sem[idx].優 += parseFloat(match[2]);
                    break;
                case "良":
                    sem[idx].良 += parseFloat(match[2]);
                    break;
                case "可":
                    sem[idx].可 += parseFloat(match[2]);
                    break;
                default:
                    break;
                }
            }
            console.log(sem);
        }
    }
})