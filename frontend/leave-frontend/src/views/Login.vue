<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">

    <div class="bg-white p-10 rounded-xl shadow-md w-96">

      <h1 class="text-2xl font-bold text-center text-gray-800 mb-2">
        Leave Management
      </h1>

      <p class="text-sm text-gray-500 text-center mb-6">
        Sign in to your account
      </p>

      <div class="space-y-4">

        <input
          v-model="email"
          type="email"
          placeholder="Email address"
          class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <button
          @click="login"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>

      </div>

    </div>

  </div>
</template>


<script>
import axios from "axios"

export default {

data(){
return{
email:"",
password:""
}
},

methods:{

async login(){

try{

const res = await axios.post(
"https://leave-management-system-backend-lh20.onrender.com/api/auth/login",
{
email:this.email,
password:this.password
}
)

// Save user details
localStorage.setItem("token", res.data.token)
localStorage.setItem("employeeId", res.data.user.employeeId)
localStorage.setItem("userName", res.data.user.name)
localStorage.setItem("role", res.data.user.role)

// redirect based on role
if(res.data.user.role === "employee"){
this.$router.push("/employee")
}else{
this.$router.push("/employer")
}

}catch(err){

alert("Invalid email or password")

}

}

}

}
</script>