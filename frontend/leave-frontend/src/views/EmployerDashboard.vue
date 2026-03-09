<template>

<div class="min-h-screen bg-gray-100">

<!-- Header -->

<div class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 flex justify-between items-center">

<div>
<h1 class="text-3xl font-bold">Leave Management System</h1>
<p class="text-sm opacity-80">Employer Dashboard</p>
</div>

<button
@click="logout"
class="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
Logout
</button>

</div>


<div class="p-10">

<!-- ADD EMPLOYEE -->

<div class="bg-white shadow-lg rounded-xl p-6 mb-10">

<h2 class="text-xl font-semibold mb-4">Add Employee</h2>

<div class="grid grid-cols-1 md:grid-cols-5 gap-4">

<input v-model="newEmployee.name" placeholder="Employee Name" class="border p-2 rounded"/>

<input v-model="newEmployee.email" placeholder="Email" class="border p-2 rounded"/>

<input v-model="newEmployee.password" type="password" placeholder="Password" class="border p-2 rounded"/>

<select v-model="newEmployee.role" class="border p-2 rounded">
<option value="employee">Employee</option>
</select>

</div>

<button
@click="addEmployee"
class="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
Add Employee
</button>

</div>


<!-- STATS -->

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

<div class="bg-white p-6 rounded-xl shadow">
<p class="text-gray-500">Total Requests</p>
<p class="text-2xl font-bold text-blue-600">{{ leaves.length }}</p>
</div>

<div class="bg-white p-6 rounded-xl shadow">
<p class="text-gray-500">Approved</p>
<p class="text-2xl font-bold text-green-600">{{ approvedCount }}</p>
</div>

<div class="bg-white p-6 rounded-xl shadow">
<p class="text-gray-500">Pending</p>
<p class="text-2xl font-bold text-yellow-600">{{ pendingCount }}</p>
</div>

</div>


<!-- SEARCH + FILTER -->

<div class="flex gap-4 mb-6">

<input
v-model="search"
placeholder="Search employee..."
class="border p-2 rounded w-60"
/>

<select v-model="filterStatus" class="border p-2 rounded">
<option value="">All</option>
<option value="Pending">Pending</option>
<option value="Approved">Approved</option>
<option value="Rejected">Rejected</option>
</select>

</div>


<!-- LEAVE TABLE -->

<div class="bg-white shadow rounded-xl overflow-hidden">

<table class="w-full">

<thead class="bg-gray-200">

<tr>
<th class="p-3 text-left">Employee</th>
<th class="p-3 text-left">Leave Type</th>
<th class="p-3 text-left">Dates</th>
<th class="p-3 text-left">Reason</th>
<th class="p-3 text-left">Status</th>
<th class="p-3 text-left">Actions</th>
</tr>

</thead>

<tbody>

<tr v-for="leave in filteredLeaves" :key="leave._id" class="border-t">

<td class="p-3">
{{ leave.employeeName }} ({{ leave.employeeId }})
</td>

<td class="p-3">
{{ leave.leaveType }}
</td>

<td class="p-3">
{{ new Date(leave.startDate).toLocaleDateString() }}
-
{{ new Date(leave.endDate).toLocaleDateString() }}
</td>

<td class="p-3 text-gray-600">
{{ leave.reason }}
</td>

<td class="p-3">

<span v-if="leave.status==='Pending'" class="bg-yellow-200 px-2 py-1 rounded">
Pending
</span>

<span v-if="leave.status==='Approved'" class="bg-green-200 px-2 py-1 rounded">
Approved
</span>

<span v-if="leave.status==='Rejected'" class="bg-red-200 px-2 py-1 rounded">
Rejected
</span>

</td>

<td class="p-3 space-x-2">

<button
v-if="leave.status==='Pending'"
@click="approveLeave(leave._id)"
class="bg-green-500 text-white px-3 py-1 rounded">
Approve
</button>

<button
v-if="leave.status==='Pending'"
@click="rejectLeave(leave._id)"
class="bg-yellow-500 text-white px-3 py-1 rounded">
Reject
</button>

<button
@click="deleteLeave(leave._id)"
class="bg-red-600 text-white px-3 py-1 rounded">
Delete
</button>

</td>

</tr>

</tbody>

</table>

</div>

</div>

</div>

</template>


<script>
import axios from "axios"

export default {

data(){
return{

leaves:[],
search:"",
filterStatus:"",

newEmployee:{
name:"",
email:"",
password:"",
role:"employee"
}

}
},

async mounted(){
this.fetchLeaves()
},

computed:{

approvedCount(){
return this.leaves.filter(l=>l.status==="Approved").length
},

pendingCount(){
return this.leaves.filter(l=>l.status==="Pending").length
},

filteredLeaves(){

return this.leaves.filter(l => {

const emp = (l.employeeName || "").toLowerCase()

const matchesSearch = emp.includes(this.search.toLowerCase())

const matchesStatus = this.filterStatus
? l.status === this.filterStatus
: true

return matchesSearch && matchesStatus

})

}

},

methods:{

async fetchLeaves(){

try{

const res = await axios.get("https://leave-management-system-backend-lh20.onrender.com/api/leave")
this.leaves = res.data

}catch(err){

console.error("Error loading leaves",err)

}

},

async addEmployee(){

try{

await axios.post(
"https://leave-management-system-backend-lh20.onrender.com/api/auth/signup",
this.newEmployee
)

alert("Employee created successfully")

this.newEmployee={
name:"",
email:"",
password:"",
role:"employee"
}

}catch(err){

alert("Error creating employee")

}

},

async approveLeave(id){

await axios.put(`https://leave-management-system-backend-lh20.onrender.com/api/leave/approve/${id}`)
this.fetchLeaves()

},

async rejectLeave(id){

await axios.put(`https://leave-management-system-backend-lh20.onrender.com/api/leave/reject/${id}`)
this.fetchLeaves()

},

async deleteLeave(id){

try{

await axios.delete(`https://leave-management-system-backend-lh20.onrender.com/api/leave/${id}`)

alert("Leave deleted successfully")

this.fetchLeaves()

}catch(err){

console.error("Delete error:",err)
alert("Failed to delete leave")

}

},

logout(){

localStorage.clear()
this.$router.push("/")

}

}

}
</script>