var vm = new Vue({
    el: "#app",
    data: {
        productList: [],
        totaMoney: "0",
        checkAllFlay: false,
        delFlay: false,
        curProduct: ""
    },
    //过滤器
    filters: {
        formatMoney: function (value) {
            return "￥" + value.toFixed(2);
        }
    },
    //实例化完成之后要查询的东西
    mounted: function () {
        this.cartView(),
            console.log(this.productList)
    },
    // 页面上的说有事件的绑定都要调用methods
    //请求this.$http.get("url"{参数})
    methods: {
        cartView: function () {
            var _this = this;
            this.$http.get("https://shoppcart-116ca.firebaseio.com/cartData.json").then(function (res) {
                _this.productList = res.body.result.productList;
                // _this.totaMoney = res.body.result.totaMoney;

            })
        },
        changeMoney: function (product, way) {
            if (way > 0) {
                product.productQuentity++

            } else {
                if (!product.productQuentity == 0) {
                    product.productQuentity--
                }
            }
            this.calcTotaPrice()
        },
        //判断item.checked是否存在，存在说明选中了，反之亦然
        //set方法是让data里没有这个变量而我们要用这个变量时，就用该方法来设置变量让Vue监听
        //set(1,2,3)1是设置放置的地方，2是设置的变量，3参数
        selectProduct: function (item) {
            if (typeof item.checked == "undefined") {
                Vue.set(item, "checked", true)
            } else {
                item.checked = !item.checked
            }
            this.calcTotaPrice()
        },
        checkAll: function (flay) {
            this.checkAllFlay = flay;
            var _this = this
            _this.productList.forEach(function (item, index) {
                if (typeof item.checked == "undefined") {
                    Vue.set(item, "checked", _this.checkAllFlay)
                } else {
                    item.checked = _this.checkAllFlay;
                }
            })
            this.calcTotaPrice()
        },
        calcTotaPrice: function () {
            var _this = this;
            _this.totaMoney = 0
            _this.productList.forEach(function (item, index) {
                if (item.checked) {
                    _this.totaMoney += item.productQuentity * item.productPrice
                }
            })
        },
        delConfirm: function (item) {
            this.delFlay = true;
            this.curProduct = item
        },
        delProduct: function () {
            var index = this.productList.indexOf(this.curProduct)
            this.productList.splice(index, 1)
            this.delFlay = false
        }
    }
})
Vue.filter("money", function (value, type) {
    return "￥" + value.toFixed(2) + type
})