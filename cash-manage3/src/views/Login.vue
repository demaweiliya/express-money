<template>
    <el-container>
        <el-main>
            <el-row type="flex" justify="center">
              
                <el-col :span="8">
                    <el-form label-position="right" label-width="80px">
                        <el-form-item label="邮箱">
                            <el-input v-model="userinfo.email"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="userinfo.password"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" round @click="onSubmit">Log In</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>

            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import request from '../api/request.js'
export default {
    name:"login",
    data(){
        return {
            userinfo:{
                email:'',
                password:'',
                name:'tool'
            }
        }
    },
    methods:{
        onSubmit(){
            request({
                url:"/api/users/login",
                method:'post',
                data:{
                    email:this.userinfo.email,
                    password:this.userinfo.password
                }
            }).then((res)=>{
                console.log(res.data);
                const { token } = res.data;
                if(window.localStorage){
                    localStorage.setItem('weiToken',token);
                    this.$router.push('/manage')
                }
            })
        }
    }
}
</script>

<style lang=stylus>

</style>
