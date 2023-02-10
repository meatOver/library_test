import axios from "axios";

export function request(config) {
    // 创建axios实例
    const instance1 = axios.create({
        baseURL: 'https://api.apiopen.top/api/',
        timeout: 5000, //设置请求超时时间
        withCredentials: false //跨域时使用凭证，默认带上cookies
    })
    // axios的拦截器
    // instance1.interceptors.request.use(
    //     config => {
    //         //判断token是否存在
    //         if (localStorage.getItem('token')) {
    //             // 在请求头中添加token
    //             config.headers.token = localStorage.getItem('token');
    //         }
    //         return config;
    //     },
    //     error => {
    //         return Promise.reject(error);
    //     }
    // )

    // 发送真正的网络请求
    // return instance1(config).then(res => {
    //     localStorage.setItem('token', res.data.result.token)
    //     console.log(res.data.result.token);
    //     // this.$router.push('/homePage')	//登录验证成功路由实现跳转
    //     console.log("登录成功")
    // }).catch(err => {
    //     console.log("获取失败")
    // })
}
