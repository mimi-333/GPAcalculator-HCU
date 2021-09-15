const Semester = function(){
    this.sum = 0;
    this.秀 = 0;
    this.優 = 0;
    this.良 = 0;
    this.可 = 0;
    this.calcScore = function(){
        return this.秀 * 4 + this.優 * 3 + this.良 * 2 + this.可;
    };
    this.calcGPA = function(){
        if(this.sum == 0){
            return 0;
        }
        return Math.round(this.calcScore() * 100 / this.sum) / 100;
    };
    this.calcGain = function(){
        return this.秀 + this.優 + this.良 + this.可;
    };
    this.calcLoss = function(){
        return this.sum - this.calcGain();
    };
};

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data(){
        return{
            target_text: "",
            semesters: [],
            dialog: false
        };
    },
    computed:{
        search_pattern: function(){
            return new RegExp('(前期|後期).+(\\d+\.\\d+).+年生\\s*(不?可\\*?|良|優|秀)', 'g')
        },
        formatted_semesters: function(){
            if(this.semesters.length != 0){
                const semesters_sum = new Semester();
                semesters_sum.sum = this.semesters[0].sum + this.semesters[1].sum;
                semesters_sum.秀 = this.semesters[0].秀 + this.semesters[1].秀;
                semesters_sum.優 = this.semesters[0].優 + this.semesters[1].優;
                semesters_sum.良 = this.semesters[0].良 + this.semesters[1].良;
                semesters_sum.可 = this.semesters[0].可 + this.semesters[1].可;

                return [["前期", this.semesters[0]],
                        ["後期", this.semesters[1]],
                        ["通期", semesters_sum]];
            }else{
                return [];
            }
        }
    },
    methods:{
        analyze(){
            const matches = this.target_text.matchAll(this.search_pattern);

            this.semesters = [new Semester(), new Semester()];

            for (const match of matches) {
                let idx = 0;
                if(match[1] !== "前期"){
                    idx = 1;
                }

                const num = parseFloat(match[2]);
                this.semesters[idx].sum += num;
                switch(match[3]){
                case "秀":
                    this.semesters[idx].秀 += num;
                    break;
                case "優":
                    this.semesters[idx].優 += num;
                    break;
                case "良":
                    this.semesters[idx].良 += num;
                    break;
                case "可":
                    this.semesters[idx].可 += num;
                    break;
                default:
                    break;
                }
            }
        }
    }
})