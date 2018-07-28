new Vue({
    el:".container",
    data:{
        addRessList:[],
        limitNum:3,
        currentIndex:"",
        content:"",
        shippingMethod:1,
        editContent:{
            addressId:"100001",
            userName:"JackBean",
            streetName:"北京市朝阳区朝阳公园",
            postCode:"100001",
            tel:"12345678901",
            isDefault:true
        }
    },
    mounted:function(){
        this.$nextTick(function(){
            this.getAddressList()
        })
    },
    computed:{
        filterAddress:function(){
            return this.addRessList.slice(0,this.limitNum);
        }
    },
    methods:{
        getAddressList:function(){
            this.$http.get("https://shoppcart-116ca.firebaseio.com/address.json").then(function(res){
               if(res.body.status == "1"){
                var res = res.body.result;
                this.addRessList=res;
                // console.log(this.addRessList)
            }
            })
        },
        loadMore:function(){
            this.limitNum=this.addRessList.length;
        },
        setDefault:function(addressId){
            this.addRessList.forEach(function(address,index){
                if(address.addressId==addressId){
                    address.isDefault = true;
                }else{
                    address.isDefault = false;
                }
            });
        },
        delConfirm:function(item){
            this.content=item;
            var index = this.addRessList.indexOf(this.content)
            this.addRessList.splice(index, 1)
        },
        editConfirm:function(item){
            this.editContent=item;
            // console.log(this.editContent)
        },
        // postAdd:function(){
        //     var _this = this
        //     editContent=this.editContent
        //     this.addRessList.push(editContent)
        //     console.log(this. addRessList)
        //     this.$http.post("https://shoppcart-116ca.firebaseio.com/address.json",
        //     result
        //     ).then(function(res){
        //         console.log(this.editContent)
        //     })
        // }
    }
})